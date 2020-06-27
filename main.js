"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const InversifyConfig_1 = require("./core/config/InversifyConfig");
const InversifyTypes_1 = require("./core/config/InversifyTypes");
const server = InversifyConfig_1.ContainerMain.get(InversifyTypes_1.TYPES.Server);
server.startServer();
//# sourceMappingURL=main.js.map