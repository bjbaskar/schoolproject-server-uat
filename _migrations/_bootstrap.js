"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const Staff_1 = require("../core/entities/Staff/Staff");
const Users_1 = require("../core/entities/Users/Users");
const Roles_1 = require("../core/entities/Users/Roles");
const DataConfig_1 = require("../core/entities/Master/DataConfig");
const Subject_1 = require("../core/entities/Master/Subject");
const ClassSections_1 = require("../core/entities/Master/ClassSections");
const SchoolProfile_1 = require("../core/entities/Master/SchoolProfile");
const EduSystems_1 = require("../core/entities/Master/EduSystems");
const Caste_1 = require("../core/entities/Master/Caste");
const RulesRegulations_1 = require("../core/entities/Master/RulesRegulations");
class Bootstrap {
    constructor() {
        this.errorArr = Array();
        this.currentUser = "admin";
        this.STAFF_ID = "";
        this.ROLE_ID = "";
        dotenv.config();
        const DB_HOST = "schooldb-uat.cccifm8dyg5y.us-east-2.rds.amazonaws.com:3306";
        const DB_NAME = "schooldbuat";
        const USERNAME = "admin";
        const PASSWORD = "Tanujab#1";
        const DB_PORT = "3306";
        const DB_SYNCHRONIZE = true;
        const DB_LOGGING = false;
        const DB_DROPSCHEMA = false;
        typeorm_1.createConnection({
            type: "mysql",
            host: DB_HOST,
            port: DB_PORT,
            synchronize: DB_SYNCHRONIZE,
            logging: DB_LOGGING,
            dropSchema: DB_DROPSCHEMA,
            username: USERNAME,
            password: PASSWORD,
            database: DB_NAME,
            entities: ["../core/entities/**/*{.ts,.js}"]
        })
            .then(() => {
            this.init();
        })
            .catch(e => {
            console.log("----------------");
            console.log("Error in connection" + e);
            console.log("----------------");
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            try {
                yield queryRunner.connect();
                yield queryRunner.startTransaction();
                const qryManager = queryRunner.manager;
                yield this.staffAdd(qryManager);
                yield this.roleAdd(qryManager);
                yield this.registerUser(qryManager);
                yield this.dataConfigAdd(qryManager);
                yield this.casteAdd(qryManager);
                yield this.subjectAdd(qryManager);
                yield this.classAdd(qryManager);
                yield this.schoolProfileAdd(qryManager);
                yield this.eduLevels(qryManager);
                yield this.schoolRules(qryManager);
                yield queryRunner.commitTransaction();
                console.log("----------------");
                console.log("Sucessfully added");
                console.log("----------------");
                return "Sucessfully added";
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new Error(`Bootstrap Error: ${error}`);
            }
            finally {
                yield queryRunner.release();
                yield connection.close();
            }
        });
    }
    staffAdd(qryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staffNo = "2019";
                const staff = new Staff_1.Staff();
                staff.staffno = staffNo;
                staff.prefixyear = 2019;
                staff.aadhaarno = "0123456789";
                staff.firstname = "admin";
                staff.lastname = "admin";
                staff.gender = "Male";
                staff.designation = "admin";
                staff.dob = new Date();
                staff.doj = new Date();
                staff.nationality = "Indian";
                staff.religion = "Hindu";
                staff.castecategory = "";
                staff.community = "";
                staff.mothertongue = "Tamil";
                staff.bloodgroup = "";
                staff.identification = "a black mole on the right chin";
                staff.isactive = true;
                staff.notes = "";
                staff.createdby = this.currentUser;
                const res = yield qryManager
                    .getRepository(Staff_1.Staff)
                    .save(staff)
                    .catch(error => {
                    throw new Error(`Staff data not saved ${error}`);
                });
                this.STAFF_ID = res.id;
                return res;
            }
            catch (error) {
                throw new Error(`staffAdd: Unable to save, ${error}`);
            }
        });
    }
    roleAdd(qryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield qryManager
                    .createQueryBuilder().insert().into(Roles_1.Roles)
                    .values([
                    { rolename: "superadmin", createdby: this.currentUser },
                    { rolename: "admin", createdby: this.currentUser },
                    { rolename: "principal", createdby: this.currentUser },
                    { rolename: "viceprincipal", createdby: this.currentUser },
                    { rolename: "teacher", createdby: this.currentUser },
                    { rolename: "nonteaching", createdby: this.currentUser },
                    { rolename: "students", createdby: this.currentUser }
                ])
                    .execute();
                return res;
            }
            catch (error) {
                throw new Error(`roleAdd: Unable to save, ${error}`);
            }
        });
    }
    registerUser(qryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    const userEntity = new Users_1.Users();
                    const staff = new Staff_1.Staff();
                    staff.id = this.STAFF_ID;
                    const qb = yield qryManager
                        .getRepository(Roles_1.Roles)
                        .createQueryBuilder("r")
                        .select("r.id")
                        .where("r.rolename = :rolename", {
                        rolename: "admin"
                    }).getOne();
                    const roles = new Roles_1.Roles();
                    roles.id = (yield qb).id;
                    userEntity.username = "admin";
                    userEntity.usertype = "staff";
                    userEntity.staff = staff;
                    userEntity.students = undefined;
                    userEntity.roles = [roles];
                    userEntity.createdby = this.currentUser;
                    const password = "admin";
                    this.hashPassword(password, (err, passwordHashed) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            reject(`Error: HashPassword ${err}`);
                        }
                        else {
                            userEntity.password = passwordHashed;
                            userEntity.students = undefined;
                            yield qryManager
                                .getRepository(Users_1.Users)
                                .save(userEntity)
                                .then(resUser => {
                                return resolve(resUser);
                            })
                                .catch(error => {
                                return reject(new Error(`Student or Staff mapping not match. please select Student or Staff ${error}`));
                            });
                        }
                    }));
                }));
            }
            catch (error) {
                throw new Error(`User Register ${error}`);
            }
        });
    }
    hashPassword(password, callback) {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (error, hash) => {
            callback(error, hash);
        });
    }
    casteAdd(qryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield qryManager
                    .createQueryBuilder().insert().into(Caste_1.Caste)
                    .values([
                    { name: "Agamudayar including Thozhu or Thuluva Vellala" }, { name: "Agaram Vellan Chettiar" }, { name: "Alwar, Azhavar and Alavar (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" },
                    { name: "Servai (except Tiruchirappalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Nulayar (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Archakarai Vellala" }, { name: "Aryavathi (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Ayira Vaisyar" }, { name: "Badagar" }, { name: "Billava" }, { name: "Bondil" }, { name: "Boyas (except Tiruchirappalli, Karur, Perambalur, Pudukkottai, The Nilgiris, Salem, Namakkal and Dharmapuri and Krishnagiri Districts)" }, { name: "Chakkala (except Sivaganga, Virudhunagar, Ramanathapuram, Thanjavur, Nagapattinam, Thiruvarur, Pudukkottai, Tiruchirappalli, Karur, Perambalur, Madurai, Theni, Dindigul and The Nilgiris Districts)" }, { name: "Chavalakarar (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Chettu or Chetty (including Kottar Chetty, Elur Chetty, Pathira Chetty, Valayal Chetty, Pudukadai Chetty) (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Chowdry" }, { name: "C.S.I. formerly S.I.U.C. (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" },
                    { name: "Donga Dasaris (except Kancheepuram Tiruvallur, Tiruchirapalli, Karur, Perambalur, Pudukkottai, Chennai, Salem and Namakkal Districts)" }, { name: "Devangar, Sedar" }, { name: "Dombs (except Pudukkottai, Tiruchirapalli, Karur and Perambalur Districts) Dommars (except Thanjavur, Nagapattinam, Tiruvarur, Pudukkottai, Vellore and Thiruvannamalai Districts)" }, { name: "Enadi" }, { name: "Ezhavathy (in Kanyakumari Districts and Shenkottah Taluk of Tirunelveli District)" }, { name: "Ezhuthachar (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Ezhuva (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Gangavar" }, { name: "Gavara, Gavarai & Vadugar (Vaduvar) (other than Kamma, Kapu, Balija & Reddi)" }, { name: "Gounder" }, { name: "Gowda (including Gammala, Kalali and Anuppa Gounder)" }, { name: "Hegde" }, { name: "Idiga" }, { name: "Illathu Pillaimar, Illuvar, Ezhuvar & Illathar" }, { name: "Jhetty" }, { name: "Jogis (except Kancheepuram, Tiruvallur, Madurai, Theni, Dindigul, Cuddalore, Villupuram, Vellore and Thiruvannamalai Districts)" }, { name: "Kabbera" }, { name: "Kaikolar, Sengunthar" }, { name: "Kaladi (except Sivaganga, Virudhunagar, Ramanathapuram, Madurai, Theni, Dindigul, Thanjavur, Nagapattinam, Thiruvarur, Pudukkottai, Tiruchirapalli, Karur and Perambalur Districts)" }, { name: "Kalari Kurup including Kalari Panicker (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Kalingi" }, { name: "Kallar, Easanattu Kallar, Gandharvakottai Kallars (except Thanjavur, Nagapattinam, Thiruvarur and Pudukkottai Districts)" }, { name: "Kallar Kula Thondaman" }, { name: "Kalveli Gounder" }, { name: "Kambar" }, { name: "Kammalar or Viswakarma, Viswakarmala (including Thattar, Porkollar, Kannar, Karumar, Kollar, Thacher, Kal Thacher, Kamsala and Viswabrahmin)" }, { name: "Kani, Kanisu, Kaniyar Panikkar" }, { name: "Kaniyala Vellalar" }, { name: "Kannada Saineegar, Kannadiyar (Through out the State) and Dasapalanjika (Coimbatore, Erode and the Nilgiris Districts)" }, { name: "Kannadiya Naidu" }, { name: "Karpoora Chettiar" }, { name: "Karuneegar (Seer Karuneegar, Sri Karuneegar, Sarattu Karuneegar, Kaikatti Karuneegar, Mathuvazhi Kanakkar, Sozhi Kanakkar & Sunnambu Karuneegar)" }, { name: "Kasukkara Chettiar" }, { name: "Katesar Pattamkatti" }, { name: "Kavuthiyar" }, { name: "Kerala Mudali" }, { name: "Kharvi" }, { name: "Khatri" }, { name: "Kongu Vaishnava" }, { name: "Kongu Vellalars (including Vellala Gounder, NattuGounder, Narambukatti Gounder, Tirumudi Vellalar, Thondu Vellalar, Pala Gounder, Poosari Gounder, Anuppa Vellala Gounder, Padaithalai, Gounder, Chendalai Gounder, Pavalankatti Vellala Gounder, Palla Vellala Gounder, Sanku Vellala Gounder, & Rathinagiri Gounder)" }, { name: "Koppala Velama" }, { name: "Koteyar" }, { name: "Krishnanvaka (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Kudikara Vellalar" }, { name: "Kudumbi (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Kuga Vellalar" }, { name: "Kunchidigar" }, { name: "Latin Catholics except Latin Catholic Vannar in Kanyakumari District" }, { name: "Lambadi" }, { name: "Lingayat (Jangama)" }, { name: "Mahratta (NonBrahmin) (including Namadev Mahratta)" }, { name: "Malayar" }, { name: "Male" }, { name: "Maniagar" },
                    { name: "Maravars" },
                    { name: "Moondrumandai Enbathunalu (84) Ur. Sozhia Vellalar" }, { name: "Mooppan" }, { name: "Muthuraja, Muthuracha, Muttiriyar, Mutharaiyar" }, { name: "Nadar, Shanar & Gramani including Christian Nadar, Christian Shanar and Christian Gramani" }, { name: "Nagaram" }, { name: "Naikkar (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Nangudi Vellalar" }, { name: "Nanjil Mudali (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Odar (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Odiya" }, { name: "Oottruvalanattu Vellalar" }, { name: "O.P.S. Vellalar" }, { name: "Ovachar" }, { name: "Paiyur Kotta Vellalar" }, { name: "Pamulu" }, { name: "Panar (except in Kanyakumari District and Shenkottah Taluk of Tirunelveli District where the Community is a Scheduled Caste)" }, { name: "Pandiya Vellalar" }, { name: "Omitted" }, { name: "Kathikarar in Kanyakumari District" }, { name: "Pannirandam Chettiar or Uthama Chettiar" }, { name: "Parkavakulam (including Surithimar Nathamar, Malayamar, Moopanar & Nainar)" }, { name: "Perike (including Perike Balija)" }, { name: "Perumkollar (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Podikara Vellalar" }, { name: "Pooluva Gounder" }, { name: "Poraya" }, { name: "Pulavar (in Coimbatore and Erode Districts)" }, { name: "Pulluvar or Pooluvar" }, { name: "Pusala" }, { name: "Reddy (Ganjam)" }, { name: "Sadhu Chetty (including Telugu Chetty Twenty four manai Telugu Chetty)" }, { name: "Sakkaravar or Kavathi (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Salivagana" }, { name: "Saliyar, Padmasaliyar, Pattusaliyar, Pattariyar and Adhaviyar" }, { name: "Savalakkarar" }, { name: "Senaithalaivar, Senaikudiyar and IIaivaniar" }, { name: "Serakula Vellalar" }, { name: "Sourashtra (Patnulkarar)" }, { name: "Sozhia Vellalar (including Sozha Vellalar, Vetrilaikarar, Kodikalkarar and Keeraikarar)" }, { name: "Srisayar" }, { name: "Sundaram Chetty" }, { name: "Thogatta Veerakshatriya" }, { name: "Tholkollar (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Tholuva Naicker and Vetalakara Naicker" }, { name: "Thoriyar" }, { name: "Ukkirakula Kshatriya Naicker" }, { name: "Uppara, Uppillia and Sagara" }, { name: "Urali Gounder (except Tiruchirapalli Karur, Perambalur and Pudukkottai Districts) and Orudaya Gounder or Oorudaya Gounder (in Madurai and Theni, Dindigul, Coimbatore, Erode, Tiruchirapalli, Karur, Perambalur, Pudukkottai, Salem and Namakkal Districts)" }, { name: "Urikkara Nayakkar" }, { name: "Virakodi Vellala" }, { name: "Vallambar" }, { name: "Vallanattu Chettiar" }, { name: "Valmiki" }, { name: "Vaniyar, Vania Chettiar (including Gandla, Ganika, Telikula and Chekkalar)" }, { name: "Veduvar and Vedar (except in Kanyakumari District and Shenkottah Taluk of Tirunelveli District Where the Community is a Scheduled Castes)" }, { name: "Veerasaiva (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Velar" }, { name: "Vellan Chettiar" }, { name: "Veluthodathu Nair (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Vokkaligar (including Vakkaligar, Okkaligar, Kappaliyar, Kappiliya, Okkaliga Gowda, Okkaliya- Gowder, Okkaliya-Gowda, Okkaliya Gowda)" }, { name: "Wynad Chetty (The Nilgiris District)" }, { name: "Yadhava (including Idaiyar, Telugu Speaking Idaiyar known as Vaduga Ayar or Vaduga Idaiyar or Golla and Asthanthra Golla)" }, { name: "Yavana" }, { name: "Yerukula" }, { name: "Ansar" }, { name: "Dekkani Muslims" }, { name: "Dudekula" }, { name: "Labbais including Rowthar and Marakayar (whether their spoken language is Tamil or Urdu)" }, { name: "Mapilla" }, { name: "Sheik" }, { name: "Syed" }, { name: "Ambalakarar" }, { name: "Andipandaram" }, { name: "Arayar (in Kanyakumari District)" }, { name: "Bestha, Siviar" }, { name: "Bhatraju (Other than Kshatriya Raju)" }, { name: "Oddars (except Thanjavur, Nagapattinam, Thiruvarur, Tiruchirappalli, Karur, Perambalur, Pudukkottai, Madurai, Theni and Dindigul Districts)" }, { name: "Dasari" }, { name: "Dommara" }, { name: "Eravallar (except in Kanyakumari District and Shenkottah Taluk of Tirunelveli District where the Community is a Scheduled Tribe)" }, { name: "Isaivellalar" }, { name: "Jambuvanodai" }, { name: "Jangam" }, { name: "Jogi" }, { name: "Kongu Chettiar (in Coimbatore and Erode Districts only)" }, { name: "Koracha" }, { name: "Kulala (including Kuyavar and Kumbarar)" }, { name: "Kunnuvar Mannadi" }, { name: "Kurumba, Kurumba Goundar" }, { name: "Kuruhini Chetty" }, { name: "Latin Catholic Christian Vannar" }, { name: "Maruthuvar, Navithar, Mangala, Velakattalavar, Velakatalanair and Pronopakari" }, { name: "Mond Golla" }, { name: "Moundadan Chetty" }, { name: "Mahendra, Medara" }, { name: "Mutlakampatti" }, { name: "Narikoravar (Kuruvikars)" }, { name: "Nokkar" }, { name: "Panisaivan / Panisivan" }, { name: "Vanniakula Kshatriya (including Vanniyar, Vanniya, Vannia Gounder, Gounder or Kander, Padayachi, Palli & Agnikula Kshatriya)" }, { name: "Paravar (except in Kanyakumari District and Shenkottah Taluk of Tirunelveli District where the Community is Scheduled Caste)" }, { name: "Paravar converts to Christianity including the Paravar converts to Christianity of Kanyakumari District and Shenkottah Taluk in Tirunelveli District)" }, { name: "Meenavar (Parvatharajakulam, Pattanavar, Sembadavar) (including converts to Christianity)" }, { name: "Mukkuvar or Mukayar (including converts to Christianity)" }, { name: "Punnan Vettuva Gounder" }, { name: "Pannayar (other than Kathikarar in Kanyakumari District)" }, { name: "Sathatha Srivaishnava (including Sathani, Chattadi and Chattada Srivaishnava)" }, { name: "Sozhia Chetty" }, { name: "Telugupatty Chetty" }, { name: "Thottia Naicker (including Rajakambalam, Gollavar, Sillavar, Thockalavar, Thozhuva Naicker and Erragollar)" }, { name: "Thondaman" }, { name: "Thoraiyar (Nilgiris)" }, { name: "Thoraiyar (Plains)" }, { name: "Valaiyar (including Chettinad Valayars)" }, { name: "Vannar (Salaivai Thozhilalar) (including Agasa, Madivala, Ekali, Rajakula, Veluthadar & Rajaka) (except in Kanyakumari District and Shenkottah Taluk of Tirunelveli District where the Community is a Scheduled Caste)" }, { name: "Vettaikarar" }, { name: "Vettuva Gounder" }, { name: "Yogeeswarar" }, { name: "Adiyan" }, { name: "Aranadan" }, { name: "Eravallan (Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Irular" }, { name: "Kadar" }, { name: "Kammara" }, { name: "Kanikaran, Kanikkar" }, { name: "Kaniyan, Kanyan" }, { name: "Kattunayakan" }, { name: "Kochu Velan" }, { name: "Konda Kapus" }, { name: "Kondareddis" }, { name: "Koraga" }, { name: "Kota" }, { name: "Kudiya, Melakudi" }, { name: "Kurichchan" }, { name: "Kurumbas" }, { name: "Kurumans" }, { name: "Maha Malasar" }, { name: "Malai Arayan" }, { name: "Malai Pandaram" }, { name: "Malai Vedan" }, { name: "Malakkuravan" }, { name: "Malasar" }, { name: "Malayali" }, { name: "Malayakandi" }, { name: "Mannan" },
                    { name: "Mudugar, Muduvan" }, { name: "Muthuvan" }, { name: "Pallayan" }, { name: "Palliyan" }, { name: "Palliyar" }, { name: "Paniyan" }, { name: "Sholaga" }, { name: "Toda" }, { name: "Uraly" }, { name: "Adi Dravida" },
                    { name: "Adi Karnataka" }, { name: "Ajila" }, { name: "Ayyanavar (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Baira" },
                    { name: "Bakuda" }, { name: "Bandi" }, { name: "Bellara" }, { name: "Bharatar (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Chalavadi" },
                    { name: "Chamar, Muchi" }, { name: "Chandala" }, { name: "Cheruman" }, { name: "Devendrakulathan" }, { name: "Dom, Dombara, Paidi, Pano" }, { name: "Domban" }, { name: "Godagali" }, { name: "Godda" },
                    { name: "Gosangi" }, { name: "Holeya" }, { name: "Jaggali" }, { name: "Jambuvulu" }, { name: "Kadaiyan" }, { name: "Kakkalan (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Kalladi" }, { name: "Kanakkan, Padanna (in the Nilgiris District)" }, { name: "Karimpalan" }, { name: "Kavara (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Koliyan" }, { name: "Koosa" },
                    { name: "Kootan, Koodan (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Kudumban" }, { name: "Kuravan, Sidhanar" }, { name: "Maila" }, { name: "Mala" }, { name: "Mannan (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Mavilan" }, { name: "Moger" }, { name: "Mundala" }, { name: "Nalakeyava" }, { name: "Nayadi" }, { name: "Padannan (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Pallan" }, { name: "Palluvan" }, { name: "Pambada" }, { name: "Panan (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Panchama" }, { name: "Pannadi" }, { name: "Panniandi" }, { name: "Paraiyan, Parayan, Sambavar" }, { name: "Paravan (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Pathiyan (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Pulayan, Cheramar" }, { name: "Puthirai Vannan" }, { name: "Raneyar" }, { name: "Samagara" }, { name: "Samban" }, { name: "Sapari" }, { name: "Semman" }, { name: "Thandan (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Tiruvalluvar" }, { name: "Vallon" }, { name: "Valluvan" }, { name: "Vannan (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Vathiriyan" }, { name: "Velan" }, { name: "Vetan (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)." }, { name: "Vettiyan" }, { name: "Vettuvan (in Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Adi Andhra" }, { name: "Arunthathiyar" }, { name: "Chakkiliyan" }, { name: "Madari" }, { name: "Madiga" }, { name: "Pagadai" }, { name: "Thoti" }, { name: "Pedda Boyar (except Tiruchirappalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Latin Catholics in Shencottah Taluk of Tirunelveli District" }, { name: "Kaloddars (except Kancheepuram, Tiruvallur, Ramanathapuram, Sivaganga, Virudhunagar, Madurai, Theni, Dindigul, Pudukkottai, Tiruchirappalli, Karur, Perambalur, Tirunelveli, Thoothukudi, Salem & Namakkal Districts)" }, { name: "Nellorepet Oddars (except Vellore and Thiruvannamalai Districts) Sooramari Oddars (except Salem and Namakkal Districts)" }, { name: "Sooramari Oddars (except Salem and Namakkal Districts)" }, { name: "Kottappal Kallars (except Pudukkottai, Tiruchirapalli, Karur and Permbalur Districts)" }, { name: "Orphans and destitues children who have lost their Parents before reaching the age of ten and are destitutes  and who have nobody else to take care of them either by law or custom  and also who are admitted into any of the Schools or orphanages run by the Government or recognised by the Government." },
                    { name: "Converts to Christianity from any Hindu Backward Classes Community or Most Backward Classes Community (except the Converts to Christianity from Meenavar, Parvatharajakulam, Pattanavar, Sembadavar, Mukkuvar or Mukayar and Paravar) or Denotified Communities" }, { name: "Attur Kilnad Koravars (Salem, Namakkal, Cuddalore, Villupuram, Ramanathapuram, Sivaganga and Virudhunagar Districts)" }, { name: "Attur Melnad Koravars (Salem and Namakkal District)" }, { name: "Appanad Kondayam Kottai Maravar (Sivaganga, Virudhunagar, Ramanathapuram, Madurai, Theni and Dindigul Districts)" }, { name: "Ambalakarar (Thanjavur, Nagapattinam, Tiruvarur, Tiruchirappalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Ambalakkarar (Suriyanur, Tiruchirapalli District)" }, { name: "Boyas (Tiruchirapalli, Karur, Perambalur, Pudukkottai, The Nilgiris, Salem, Namakkal, Dharmapuri and Krishnagiri Districts)" }, { name: "Battu Turkas" }, { name: "C.K. Koravars (Cuddalore and Villupuram Districts)" }, { name: "Chakkala (Sivaganga, Virudhunagar, Ramanathapuram, Thanjavur, Nagapattinam, Thiruvarur, Pudukkottai, Tiruchirapalli, Karur, Perambalur, Madurai, Theni, Dindigul and the Nilgiris Districts)" }, { name: "Changyampudi Koravars (Vellore and Thiruvannamalai Districts)" }, { name: "Chettinad Valayars (Sivaganga, Virudhunagar and Ramanathapuram Districts)" }, { name: "Dombs (Pudukkottai, Tiruchirapalli, Karur and Perambalur Districts)" }, { name: "Dobba Koravars (Salem and Namakkal Districts)" }, { name: "Dommars (Thanjavur, Nagapattinam, Thiruvarur, Pudukkottai, Vellore and Thiruvannamalai Districts)" }, { name: "Donga Boya" }, { name: "Donga Ur. Korachas" }, { name: "Devagudi Talayaris" }, { name: "Dobbai Korachas (Tiruchirapalli, Karur Perambalur and Pudukkottai Districts)" }, { name: "Dabi Koravars (Thanjavur, Nagapattinam, Thiruvarur, Tiruchirapalli, Karur, Perambalur, Pudukkottai, Vellore and Thiruvannamalai Districts)" }, { name: "Donga Dasaris (Kancheepuram, Tiruvallur, Tiruchirapalli, Karur, Perambalur, Pudukkottai, Chennai, Salem and Namakkal Districts)" }, { name: "Gorrela Dodda Boya" }, { name: "Gudu Dasaris" }, { name: "Gandarvakottai Koravars (Thanjavur, Nagapattinam, Thiruvarur, Tiruchirapalli, Karur, Perambalur, Pudukkottai, Cuddalore and Villupuram Districts)" }, { name: "Gandarvakottai Kallars (Thanjavur, Nagapattinam, Thiruvarur and Pudukkottai Districts)" }, { name: "Inji Koravars (Thanjavur, Nagapattinam, Thiruvarur, Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Jogis (Kancheepuram, Tiruvallur, Chennai, Cuddalore, Villupuram, Vellore and Thiruvannamalai Districts)" }, { name: "Jambavanodai" }, { name: "Kaladis (Sivaganga, Virudhunagar, Ramanathapuram, Madurai, Theni, Dindigul, Thanjavur, Nagapattinam, Thiruvarur, Pudukkottai, Tiruchirapalli, Karur and Perambalur Districts)" }, { name: "Kal Oddars (Kancheepuram, Thiruvallur, Ramanathapuram, Sivaganga, Virudhunagar, Madurai, Theni, Dindigul, Pudukkottai, Thanjavur, Nagapattinam, Tiruvarur, Tiruchirapalli, Karur, Perambalur, Tirunelveli, Thoothukudi, Salem and Namakkal Districts)" }, { name: "Koravars (Kancheepuram, Tiruvallur, Ramanathapuram, Sivaganga, Virudhunagar, Pudukkottai, Thanjavur, Nagapattinam, Thiruvarur, Tiruchirapalli, Karur, Perambalur, Tirunelveli, Thoothukudi, Chennai, Madurai, Theni, Dindigul and The Nilgiris Distrists" }, { name: "Kalinji Dabikoravars (Thanjavur, Nagapattinam, Tiruvarur and Pudukkottai Districts)" }, { name: "Kootappal Kallars (Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Kala Koravars (Thanjavur, Nagapattinam, Thiruvarur, Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Kalavathila Boyas" }, { name: "Kepmaris (Kancheepuram, Tiruvallur, Pudukkottai, Tiruchirapalli, Karur and Perambalur Districts)" },
                    { name: "Monda Koravars" }, { name: "Monda Golla (Salem and Namakkal Districts)" }, { name: "Mutlakampatti (Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Nokkars (Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Nellorepet Oddars (Vellore and Thiruvannamalai Districts)" }, { name: "Oddars (Thanjavur, Nagapattinam, Thiruvarur, Tiruchirapalli, Karur, Perambalur, Pudukkottai, Madurai, Theni and Dindigul Districts)" }, { name: "Pedda Boyas (Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Ponnai Koravars (Vellore and Thiruvannamalai Districts)" }, { name: "Piramalai Kallars (Sivagangai, Virudhunagar, Ramanathapuram, Madurai, Theni, Dindigul, Pudukkottai, Thanjavur, Nagapattinam and Thiruvarur Districts)" }, { name: "Periya Suriyur Kallars (Tiruchirapalli, Karur, Perambalur, and Pudukkottai Districts)" }, { name: "Padayachi (Vellayan Kuppam in Cuddalore District and Tennore in Tiruchirapalli District)" }, { name: "Punnan Vettuva Gounder (Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Servai (Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Salem Melnad Koravars (Madurai, Theni, Dindigul, Coimbatore, Erode, Pudukkottai, Tiruchirapalli, Karur, Perambalur, Salem, Namakkal, Vellore and Thiruvannamalai Districts)" }, { name: "Salem Uppu Koravars (Salem and Namakkal Districts)" }, { name: "Sakkaraithamadai Koravars (Vellore and Thiruvannamalai districts)" }, { name: "Saranga Palli Koravars" }, { name: "Sooramari Oddars (Salem and Namakkal Districts)" },
                    { name: "Sembanad Maravars (Sivaganga, Virudhunagar and Ramanathapuram Districts)" }, { name: "Thalli Koravars (Salem and Namakkal Districts)" }, { name: "Telungapatti Chettis (Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Thottia Naickers (Sivaganga, Virudhunagar, Ramanathapuram, Kancheepuram, Tiruvallur, Thanjavur, Nagapattinam, Karur, Tiruchirapalli, Karur, Perambalur. Pudukkottai, Tirunelveli, Thoothukudi, Salem, Namakkal, Vellore, Thiruvannamalai, Coimbatore & Erode Districts)" }, { name: "Thogamalai Koravars or Kepmaris (Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Uppukoravars or Settipalli Koravars (Thanjavur, Nagapattinam, Thiruvarur, Pudukkottai, Madurai, Theni, Dindigul, Vellore and Thiruvannamalai Districts)" }, { name: "Urali Gounders (Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Wayalpad or Nawalpeta Korachas" }, { name: "Vaduvarpatti Koravars (Madurai, Theni, Dindigul, Ramanathapuram, Sivaganga, Virudhunagar, Tirunelveli, Thoothukudi, Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Valayars (Madurai, Theni, Dindigul, Tiruchirapalli, Karur, Perambalur, Pudukkottai, Erode and Coimbatore Districts)" }, { name: "Vettaikarar (Thanjavur, Nagapattinam, Thiruvarur and Pudukkottai Districts)" }, { name: "Vetta koravars (Salem and Namakkal District)" }, { name: "Varaganeri Koravars (Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Vettuva Gounder (Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "General" }, { name: "Piramalai Kallars (except Sivaganga, Virudhunagar, Ramanathapuram, Madurai, Theni, Dindigul, Pudukkottai, Thanjavur, Nagapattinam and Thiruvarur Districts)" }, { name: "Periyasooriyur Kallars (except Tiruchirapalli, Karur, Perambalur and Pudukkottai Districts)" }, { name: "Converts to Christianity from Scheduled Castes irrespective of the generation of conversion (except the Paravar converts to Christianity of Kanyakumari District and Shenkottah Taluk of Tirunelveli District)" }, { name: "Boyar, Oddar" }, { name: "Latin Catholic Christian Vannar (in Kanyakumari District)" }, { name: "Transgender or Eunuch (Thirunangai or Aravani)" },
                    { name: "Caste not disclosed" }
                ])
                    .execute();
                return res;
            }
            catch (error) {
                throw new Error(`dataConfigAdd Error ${error}`);
            }
        });
    }
    dataConfigAdd(qryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield qryManager
                    .createQueryBuilder().insert().into(DataConfig_1.DataConfig)
                    .values([
                    { name: "RELIGION", value: "Hindu" },
                    { name: "RELIGION", value: "Christian" },
                    { name: "RELIGION", value: "Muslim" },
                    { name: "RELIGION", value: "Others" },
                    { name: "RELIGION", value: "Janism" },
                    { name: "RELIGION", value: "Sikh" },
                    { name: "RELIGION", value: "Religion not disclosed" },
                    { name: "RELIGION", value: "Buddhism" },
                    { name: "SIBLINGS", value: "Father" },
                    { name: "SIBLINGS", value: "Mother" },
                    { name: "SIBLINGS", value: "Brother" },
                    { name: "MOTHER_TONGUE", value: "Tamil" },
                    { name: "MOTHER_TONGUE", value: "Telugu" },
                    { name: "MOTHER_TONGUE", value: "Malayalam" },
                    { name: "MOTHER_TONGUE", value: "English" },
                    { name: "BLOOD_GROUP", value: "A+ve" },
                    { name: "BLOOD_GROUP", value: "A-ve" },
                    { name: "BLOOD_GROUP", value: "B+ve" },
                    { name: "BLOOD_GROUP", value: "B-ve" },
                    { name: "BLOOD_GROUP", value: "AB+ve" },
                    { name: "BLOOD_GROUP", value: "AB-ve" },
                    { name: "BLOOD_GROUP", value: "O+ve" },
                    { name: "BLOOD_GROUP", value: "O-ve" },
                    { name: "BLOOD_GROUP", value: "A1+ve" },
                    { name: "BLOOD_GROUP", value: "A1-ve" },
                    { name: "BLOOD_GROUP", value: "A1B+ve" },
                    { name: "BLOOD_GROUP", value: "A1B-ve" },
                    { name: "BLOOD_GROUP", value: "A2+ve" },
                    { name: "BLOOD_GROUP", value: "A2-ve" },
                    { name: "BLOOD_GROUP", value: "A2B+ve" },
                    { name: "BLOOD_GROUP", value: "A2B-ve" },
                    { name: "BLOOD_GROUP", value: "B1+ve" },
                    { name: "DESIGNATION", value: "Teacher" },
                    { name: "DESIGNATION", value: "NonTeaching" },
                    { name: "COMMUNITY", value: "BC-Others" },
                    { name: "COMMUNITY", value: "BC-Muslim" },
                    { name: "COMMUNITY", value: "MBC" },
                    { name: "COMMUNITY", value: "ST" },
                    { name: "COMMUNITY", value: "SC-Others" },
                    { name: "COMMUNITY", value: "SC-Arunthathiyar" },
                    { name: "COMMUNITY", value: "OC" },
                    { name: "COMMUNITY", value: "DNC (Denotified Communities)" },
                    { name: "COMMUNITY", value: "Others" },
                    { name: "OCCUPATION", value: "Govt" },
                    { name: "OCCUPATION", value: "Private" },
                    { name: "OCCUPATION", value: "Self-employed" },
                    { name: "OCCUPATION", value: "Daily wages" },
                    { name: "OCCUPATION", value: "Un-employed" },
                    { name: "OCCUPATION", value: "N/A" },
                    { name: "LEAVE_TYPE", value: "Sick Leave" },
                    { name: "LEAVE_TYPE", value: "Other Leave" },
                    { name: "GENDER", value: "Male" },
                    { name: "GENDER", value: "Female" },
                    { name: "RELATIONS", value: "Father" },
                    { name: "RELATIONS", value: "Mother" },
                    { name: "BOOK_TYPE", value: "TextBook" },
                    { name: "BOOK_TYPE", value: "TextNote" },
                    { name: "BOOK_TYPE", value: "Composition Note" },
                    { name: "BOOK_TYPE", value: "Test Note" },
                    { name: "HOLIDAY_TYPE", value: "Public" },
                    { name: "HOLIDAY_TYPE", value: "Local" },
                    { name: "HOLIDAY_TYPE", value: "School Internal" },
                    { name: "IDENTITY", value: "Aaadhar Card" },
                    { name: "IDENTITY", value: "Birth Certificate" },
                    { name: "IDENTITY", value: "Passport" },
                    { name: "IDENTITY", value: "Pan Card" },
                    { name: "IDENTITY", value: "Ration Card" },
                    { name: "IDENTITY", value: "Driving License" },
                    { name: "IDENTITY", value: "Others" },
                ])
                    .execute();
                return res;
            }
            catch (error) {
                throw new Error(`dataConfigAdd Error ${error}`);
            }
        });
    }
    subjectAdd(qryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield qryManager
                    .createQueryBuilder().insert().into(Subject_1.Subject)
                    .values([
                    { name: "Tamil I", subcode: "TA01", color: "#e5e5e5", createdby: this.currentUser },
                    { name: "Tamil II", subcode: "TA02", color: "#e5e5e5", createdby: this.currentUser },
                    { name: "English I", subcode: "EN01", color: "#e5e5e5", createdby: this.currentUser },
                    { name: "English II", subcode: "EN02", color: "#e5e5e5", createdby: this.currentUser },
                    { name: "Mathematics", subcode: "M01", color: "#e5e5e5", createdby: this.currentUser },
                    { name: "Science", subcode: "SC01", color: "#e5e5e5", createdby: this.currentUser },
                    { name: "General Knowledge", subcode: "GK01", color: "#e5e5e5", createdby: this.currentUser },
                ])
                    .execute();
                return res;
            }
            catch (error) {
                throw new Error(`subjectAdd: Unable to save, ${error}`);
            }
        });
    }
    classAdd(qryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield qryManager
                    .createQueryBuilder().insert().into(ClassSections_1.ClassSections)
                    .values([
                    { name: "Pre-KG", section: "A", createdby: this.currentUser },
                    { name: "LKG", section: "A", createdby: this.currentUser },
                    { name: "UKG", section: "A", createdby: this.currentUser },
                    { name: "I", section: "A", createdby: this.currentUser },
                    { name: "II", section: "A", createdby: this.currentUser },
                    { name: "III", section: "A", createdby: this.currentUser },
                    { name: "IV", section: "A", createdby: this.currentUser },
                    { name: "V", section: "A", createdby: this.currentUser },
                ])
                    .execute();
                return res;
            }
            catch (error) {
                throw new Error(`classAdd: Unable to save, ${error}`);
            }
        });
    }
    schoolProfileAdd(qryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staffNo = "2019";
                const sp = new SchoolProfile_1.SchoolProfile();
                sp.name = "Sivanandha Vidyalaya Matriculation School";
                sp.surname = "Sivanandha School";
                sp.logo = "logo comes here";
                sp.sector = "Private";
                sp.provider = "K.G. Balaganesan Educational Trust";
                sp.type = "Matriculation ( Directorate of Matriculation Board )";
                sp.dateopened = new Date("06/01/1983");
                sp.address = "Thirukaneeswarar kovil Road, Seithur, Chellathai amman kovil road, Seithur";
                sp.postalcode = "626121";
                sp.district = "Virudhunagar district";
                sp.taluk = "Rajapalayam Taluk";
                sp.locality = "Rajapalayam Taluk";
                sp.latitude = "Rajapalayam Taluk";
                sp.longitude = "Rajapalayam Taluk";
                sp.createdby = this.currentUser;
                const res = yield qryManager
                    .getRepository(SchoolProfile_1.SchoolProfile)
                    .save(sp)
                    .catch(error => {
                    throw new Error(`School Profile data not saved ${error}`);
                });
                this.STAFF_ID = res.id;
                return res;
            }
            catch (error) {
                throw new Error(`${__dirname} School Profile: Unable to save, ${error}`);
            }
        });
    }
    eduLevels(qryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield qryManager
                    .createQueryBuilder().insert().into(EduSystems_1.EduSystems)
                    .values([
                    { name: "Matriculation Board", levels: "Pre-Primary", createdby: this.currentUser },
                    { name: "Matriculation Board", levels: "Primary", createdby: this.currentUser },
                    { name: "Matriculation Board", levels: "Secondary", createdby: this.currentUser },
                    { name: "Matriculation Board", levels: "Higher Secondary", createdby: this.currentUser },
                    { name: "Nursery & Primary", levels: "Pre-Primary", createdby: this.currentUser },
                    { name: "Nursery & Primary", levels: "Primary", createdby: this.currentUser },
                    { name: "Nursery & Primary", levels: "Secondary", createdby: this.currentUser },
                    { name: "Nursery & Primary", levels: "Higher Secondary", createdby: this.currentUser },
                    { name: "State Board", levels: "Primary", createdby: this.currentUser },
                    { name: "State Board", levels: "Secondary", createdby: this.currentUser },
                    { name: "State Board", levels: "Higher Secondary", createdby: this.currentUser },
                ])
                    .execute();
                return res;
            }
            catch (error) {
                throw new Error(`${__dirname} School Profile: Unable to save, ${error}`);
            }
        });
    }
    schoolRules(qryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield qryManager
                    .createQueryBuilder().insert().into(RulesRegulations_1.RulesRegulations)
                    .values([
                    {
                        orderby: 3,
                        title: "Essential for an ideal student",
                        entext: "Maintain personal hygiene and cleanliness. Washing your hands before and after food is important. Hair should be well groomed and nails trimmed regularly. Boys should have their hair trimmed short (Spike type cut is not allowed) with sideburns not exceeding 2.5cm.Fashionable hair cut is not allowed for both boys & girls.",
                        tamiltext: "தனிப்பட்ட சுகாதாரம் மற்றும் தூய்மையை பராமரிக்கவும். உணவுக்கு முன்னும் பின்னும் கைகளை கழுவுவது முக்கியம். தலைமுடி நன்கு வளர்ந்திருக்க வேண்டும் மற்றும் நகங்களை தவறாமல் ஒழுங்கமைக்க வேண்டும். பையன்களின் தலைமுடி குறுகியதாக இருக்க வேண்டும் (ஸ்பைக் வகை வெட்டு அனுமதிக்கப்படாது) பக்கப்பட்டிகள் 2.5 செ.மீ.க்கு மிகாமல் இருக்க வேண்டும். சிறுவர்களுக்கும் சிறுமிகளுக்கும் நாகரீகமான முடி வெட்டு அனுமதிக்கப்படாது."
                    },
                    {
                        orderby: 3,
                        title: "Essential for an ideal student",
                        entext: "In case of sickness / ailment inform the class teacher & meet the doctor immediately.",
                        tamiltext: "நோய் / வியாதி ஏற்பட்டால் வகுப்பு ஆசிரியருக்கு அறிவித்து உடனடியாக மருத்துவரை சந்திக்கவும்."
                    },
                    {
                        orderby: 3,
                        title: "Essential for an ideal student",
                        entext: "The official language for communication inside the school campus is ENGLISH. It is essential for every student to communicate with one another in English, as it is an important component of employability at the later stage.",
                        tamiltext: "பள்ளி வளாகத்திற்குள் தொடர்பு கொள்வதற்கான அதிகாரப்பூர்வ மொழி ஆங்கிலம். ஒவ்வொரு மாணவரும் ஒருவருக்கொருவர் ஆங்கிலத்தில் தொடர்புகொள்வது அவசியம், ஏனெனில் இது பிற்கால கட்டத்தில் வேலைவாய்ப்பின் முக்கிய அங்கமாகும்."
                    },
                    {
                        orderby: 3,
                        title: "Essential for an ideal student",
                        entext: "Regularity, Punctuality in work and school attendance are essential.",
                        tamiltext: "ஒழுங்குமுறை, வேலையில் நேரமின்மை மற்றும் பள்ளி வருகை அவசியம்."
                    },
                    {
                        orderby: 3,
                        title: "Essential for an ideal student",
                        entext: "During rainy season,carry a rain coat or an umbrella to the school.",
                        tamiltext: "மழைக்காலங்களில், பள்ளிக்கு ஒரு நீர்புகா மேல்சட்டை அல்லது ஒரு குடையை எடுத்துச் செல்லுங்கள்."
                    },
                    {
                        orderby: 3,
                        title: "Essential for an ideal student",
                        entext: "Adhere to the traffic rules. Cyclists should keep to the left and should come one behind the other. Halt for a while at the junction or turns and look on either side of the road for any vehicle before crossing the road.Riding doubles/triples is risky and against the government regulation.",
                        tamiltext: "போக்குவரத்து விதிகளை பின்பற்றவும். சைக்கிள் ஓட்டுபவர்கள் இடதுபுறமாக இருக்க வேண்டும், ஒன்றன்பின் ஒன்றாக வர வேண்டும். சந்திப்பில் சிறிது நேரம் நிறுத்திவிட்டு, சாலையைக் கடப்பதற்கு முன் எந்தவொரு வாகனத்திற்கும் சாலையின் இருபுறமும் பாருங்கள். இரட்டையர் / மும்மடங்கு சவாரி செய்வது ஆபத்தானது மற்றும் அரசாங்க ஒழுங்குமுறைக்கு எதிரானது."
                    },
                    {
                        orderby: 1,
                        title: "Code of conduct : Students",
                        entext: "You are not permitted to bring story books, crackers, calculators, cell phones, electronic gadgets, playthings, game card and other unwanted materials to the school.",
                        tamiltext: "கதை புத்தகங்கள், பட்டாசுகள், கால்குலேட்டர்கள், செல்போன்கள், மின்னணு கேஜெட்டுகள், விளையாட்டு பொருட்கள் மற்றும் பிற தேவையற்ற பொருட்களை பள்ளிக்கு கொண்டு வர உங்களுக்கு அனுமதி இல்லை."
                    },
                    {
                        orderby: 1,
                        title: "Code of conduct : Students",
                        entext: "In case of any ailment , you need not come to school until ailment is  completely cured ,even on examination days. A medical certificate should be produced.",
                        tamiltext: "ஏதேனும் வியாதி ஏற்பட்டால், நோய் முழுமையாக குணமாகும் வரை, தேர்வு நாட்களில் கூட நீங்கள் பள்ளிக்கு வர வேண்டியதில்லை. மருத்துவ சான்றிதழ் சமர்ப்பிக்கப்பட வேண்டும்."
                    },
                    {
                        orderby: 1,
                        title: "Code of conduct : Students",
                        entext: "Attendance is compulsory for national festivals and school functions.",
                        tamiltext: "தேசிய விழாக்கள் மற்றும் பள்ளி விழாக்களுக்கு வருகை கட்டாயமாகும்."
                    },
                    {
                        orderby: 1,
                        title: "Code of conduct : Students",
                        entext: "Note that student indulging in malpractice in the examinations will be given zero in the subject besides the disciplinary action taken against them.",
                        tamiltext: "பரீட்சைகளில் முறைகேட்டில் ஈடுபடும் மாணவர்களுக்கு பாடத்தில் பூஜ்ஜியம் வழங்கப்படும் என்பதை நினைவில் கொள்க வேண்டும்."
                    },
                    {
                        orderby: 4,
                        title: "Maintenance of note books & text books",
                        entext: "Number all the pages of the note books. Do not detach any paper from the notebooks.",
                        tamiltext: "புத்தகங்களிலிருந்து எந்த காகிதத்தையும் பிரிக்க/கிழிக்கக்கூடாது."
                    },
                    {
                        orderby: 4,
                        title: "Maintenance of note books & text books",
                        entext: "Write neatly and legibly.",
                        tamiltext: "நேர்த்தியாகவும் தெளிவாகவும் எழுதுங்கள்."
                    },
                    {
                        orderby: 4,
                        title: "Maintenance of note books & text books",
                        entext: "Submit home assignments, activities, projects, class work-notebooks for correction within the stipulated time.",
                        tamiltext: "நிர்ணயிக்கப்பட்ட நேரத்திற்குள் வீட்டுப்பாடம், செயல்பாடுகள், திட்டங்கள், வகுப்பு வேலை-குறிப்பேடுகள் ஆகியவற்றைச் சமர்ப்பிக்கவும்."
                    },
                    {
                        orderby: 2,
                        title: "To the parents",
                        entext: "Parents are requested to send their children neat and tidy and see that the children are punctual to the school.",
                        tamiltext: "பெற்றோர்கள் தங்கள் குழந்தைகளை நேர்த்தியாகவும் நேர்த்தியாகவும் அனுப்பவும், குழந்தைகள் சரியான நேரத்தில் பள்ளிக்கு வருவதைக் காணவும் கேட்டுக்கொள்ளப்படுகிறார்கள்."
                    },
                    {
                        orderby: 2,
                        title: "To the parents",
                        entext: "Parents are also expected to co-operate with the school management and staff regarding discipline and studies.",
                        tamiltext: "ஒழுக்கம் மற்றும் படிப்பு தொடர்பாக பள்ளி நிர்வாகம் மற்றும் ஊழியர்களுடன் பெற்றோர்கள் ஒத்துழைப்பார்கள் என்று எதிர்பார்க்கப்படுகிறது."
                    },
                    {
                        orderby: 2,
                        title: "To the parents",
                        entext: "Parent signature in the progress card is a must after every test and examination.",
                        tamiltext: "ஒவ்வொரு அட்டை மற்றும் பரீட்சைக்குப் பிறகும் முன்னேற்ற அட்டையில் பெற்றோர் கையொப்பம் அவசியம்."
                    },
                    {
                        orderby: 2,
                        title: "To the parents",
                        entext: "The Parents are expected to meet the Principal or class teacher if the child’s progress is not satisfactory.",
                        tamiltext: "குழந்தையின் முன்னேற்றம் திருப்திகரமாக இல்லாவிட்டால், பெற்றோர் முதல்வர் அல்லது வகுப்பு ஆசிரியரை சந்திப்பார்கள் என்று எதிர்பார்க்கப்படுகிறது."
                    },
                    {
                        orderby: 2,
                        title: "To the parents",
                        entext: "Parents co-operation with the school management and staff regarding discipline and regularity in home work will be highly appreciated.",
                        tamiltext: "வீட்டு வேலைகளில் ஒழுக்கம் மற்றும் ஒழுங்குமுறை குறித்து பள்ளி நிர்வாகம் மற்றும் ஊழியர்களுடன் பெற்றோரின் ஒத்துழைப்பு மிகவும் பாராட்டப்படும்."
                    }, {
                        orderby: 2,
                        title: "To the parents",
                        entext: "Students including L.K.G. are asked to bring lunch to the school and they can take their lunch in the school premises. Kindly send the lunch kit with all necessary things in it.",
                        tamiltext: "எல்.கே.ஜி உள்ளிட்ட மாணவர்கள். பள்ளிக்கு மதிய உணவைக் கொண்டு வரும்படி கேட்கப்படுகிறார்கள், அவர்கள் மதிய உணவை பள்ளி வளாகத்தில் எடுத்துக் கொள்ளலாம். தயவுசெய்து தேவையான அனைத்து பொருட்களையும் கொண்டு மதிய உணவு கிட் அனுப்பவும்."
                    }, {
                        orderby: 2,
                        title: "To the parents",
                        entext: "Parents are advised to meet the teacher concerned on any day to discuss about the progress of the students from 4.00 p.m. to 4.30 p.m.",
                        tamiltext: "மாலை 4.00 மணி முதல் மாணவர்களின் முன்னேற்றம் குறித்து விவாதிக்க பெற்றோர்கள் எந்த நாளிலும் சம்பந்தப்பட்ட ஆசிரியரை சந்திக்க அறிவுறுத்தப்படுகிறார்கள். மாலை 4.30 மணி முதல்."
                    },
                    {
                        orderby: 2,
                        title: "To the parents",
                        entext: "The progress of the students depends on the co-operation of the teacher and parent. Hence the parent or guardian are requested to refer the Hand Book of their children regularly and make them to do their homework daily.",
                        tamiltext: "மாணவர்களின் முன்னேற்றம் ஆசிரியர் மற்றும் பெற்றோரின் ஒத்துழைப்பைப் பொறுத்தது. எனவே பெற்றோர் அல்லது பாதுகாவலர் தங்கள் குழந்தைகளின் கை புத்தகத்தை தவறாமல் பார்க்கவும், தினசரி வீட்டுப்பாடங்களைச் செய்யும்படி கேட்டுக்கொள்ளப்படுகிறார்கள்."
                    },
                ])
                    .execute();
                return res;
            }
            catch (error) {
                throw new Error(`${__dirname} School Profile: Unable to save, ${error}`);
            }
        });
    }
}
exports.Bootstrap = Bootstrap;
const test = new Bootstrap();
//# sourceMappingURL=_bootstrap.js.map
