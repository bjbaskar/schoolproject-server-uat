"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const typeorm_1 = require("typeorm");
const inversify_1 = require("inversify");
const AbstractSetting_1 = require("./core/config/AbstractSetting");
const AbstractLogger_1 = require("./core/logger/AbstractLogger");
const resolvers_1 = __importDefault(require("./resolvers"));
const context_1 = require("./context");
const InversifyTypes_1 = require("./core/config/InversifyTypes");
const graphql_1 = require("graphql");
const path_1 = __importDefault(require("path"));
let Server = class Server {
    constructor(logger, setting) {
        this.logger = logger;
        this.setting = setting;
    }
    startServer() {
        try {
            this.logger.info("🚀 Starting API server...");
            this.port = parseInt(this.setting.config.server.port, 10);
            this.logger.info(`Running on PORT : ${this.port}`);
            typeorm_1.createConnection({
                type: "mysql",
                host: this.setting.config.database.host,
                port: this.setting.config.database.port,
                synchronize: this.setting.config.database.synchronize,
                logging: this.setting.config.database.logging,
                dropSchema: this.setting.config.database.dropSchema,
                username: this.setting.config.database.username,
                password: this.setting.config.database.password,
                database: this.setting.config.database.databasename,
                entities: [__dirname + "/core/entities/**/*{.ts,.js}"]
            })
                .then(() => {
                this.logger.info(`Successfully connected to database. ${this.setting.config.database.host}`);
                this.app = express_1.default().use("*", cors_1.default());
                try {
                    const context = context_1.getContext();
                    this.initServer(context);
                }
                catch (error) {
                    this.logger.error(`Failure to connect to HTTP Server: ${error}`);
                }
            })
                .catch((error) => {
                console.log(error);
                const { code, sqlMessage } = error;
                if (code === "PROTOCOL_CONNECTION_LOST") {
                    setTimeout(this.startServer, 2000);
                }
                this.logger.error(`Failure to connect to database: ${error} ${sqlMessage}`);
            });
        }
        catch (error) {
            this.logger.info(`Error on start API server...${error}`);
        }
    }
    initServer(contextAPI) {
        return __awaiter(this, void 0, void 0, function* () {
            this.apolloServer = new apollo_server_express_1.ApolloServer({
                schema: resolvers_1.default,
                context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const userInfo = yield contextAPI.AuthService.getAuthUser(req);
                        if (!userInfo || userInfo.UserType === "" || userInfo.UserType === undefined) {
                            throw new apollo_server_express_1.AuthenticationError("UserType is empty. You must be logged in!");
                        }
                        contextAPI.CurrentUser = Object.assign({}, userInfo);
                        contextAPI.ReqUserAgent = req.headers["user-agent"];
                        const contexts = Object.assign({}, contextAPI);
                        return contexts;
                    }
                    catch (error) {
                        throw new apollo_server_express_1.AuthenticationError(`initServer Err: You must be logged in! ${error}`);
                    }
                }),
                formatError: error => {
                    this.logger.error(`Error: ${error.message} - Trace: ${error}`);
                    return new graphql_1.GraphQLError(error.message);
                }
            });
            this.apolloServer.applyMiddleware({ app: this.app });
            const httpServer = http_1.createServer(this.app);
            this.apolloServer.installSubscriptionHandlers(httpServer);
            this.app.use("/downloads", express_1.default.static(path_1.default.join(__dirname, "../upload_folder")));
            httpServer.listen({ port: this.port }, () => {
                this.logger.info(`🔥 Server is ready at http://localhost:${this.port}${this.apolloServer.graphqlPath}`);
                this.logger.info(`🔥 Playground is ready at http://localhost:${this.port}${this.apolloServer.graphqlPath}`);
                this.logger.info(`🔥 Subscriptions is ready at ws://localhost:${this.port}${this.apolloServer.subscriptionsPath}`);
            });
        });
    }
};
Server = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(InversifyTypes_1.TYPES.Logger)),
    __param(1, inversify_1.inject(InversifyTypes_1.TYPES.Setting)),
    __metadata("design:paramtypes", [AbstractLogger_1.AbstractLogger,
        AbstractSetting_1.AbstractSetting])
], Server);
exports.Server = Server;
//# sourceMappingURL=server.js.map