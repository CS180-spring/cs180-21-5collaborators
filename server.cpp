//code samples to help create project from crow repo
//problem solving help from chatgpt
#define CROW_ENABLE_CORS
#include <iostream>
#include <crow.h>
#include <string>
#include <filesystem>
#include <fstream>
#include <sstream>
#include <vector>
#include "rapidjson/document.h"
#include "crow/middlewares/cors.h"


//#include "crow_all.h"

//simplified patient
class Patient {
public:
    int id;
    std::string name;
    int appointmentId;
    std::string gender;
    std::string scheduledDay;
    std::string appointmentDay;
    int age;
    std::string neighbourhood;
    bool scholarship;
    bool hypertension;
    bool diabetes;
    bool alcoholism;
    bool handicap;
    bool smsReceived;
    std::string noShow;

    Patient(int id, std::string name, int appointmentId, std::string gender, std::string scheduledDay, std::string appointmentDay, int age,
        std::string neighbourhood, bool scholarship, bool hypertension, bool diabetes, bool alcoholism, bool handicap, bool smsReceived, std::string noShow) : id(id), name(name),
        appointmentId(appointmentId), gender(gender), scheduledDay(scheduledDay), appointmentDay(appointmentDay), age(age), neighbourhood(neighbourhood)
        , scholarship(scholarship), hypertension(hypertension), diabetes(diabetes), alcoholism(alcoholism), handicap(handicap), smsReceived(smsReceived)
        , noShow(noShow) {};
    Patient(){};

    /**Here, I wrote a couple implementations for how we'd append new appointments to a patient. I'm not sure if they'll be useful - delete them if they're not. I'm just trying to do something.
     * I've named them appointments_ints, appointments_string, and appointments_struct respectively. It's probably better if you rename them back to just "appointments" after picking the most convenient one.
    */

    /**Implementation 1: Integer vector of appointments
     * This is the least flexible implementation but the fastest and easiest to perform operations on.
     * You'd need to change the constructor to push a new value for this implementation.
    */
    std::vector<int> appointments_ints;

    /**addAppointment: Adds a new appointment.*/
    void addAppointment_Ints(int id){
        appointments_ints.push_back(id);
    }

    /**getRecentAppointments: Gets the x most recent appointments as a pointer to an array.
     * Returns all the values if you ask for too many of them.
    */
    std::vector<int>* getRecentAppointments_Ints(int numberToGet){
        std::vector<int>* temp;

        if (numberToGet <= appointments_ints.size()){
            int index = 0;
            
            while (index < numberToGet){
                temp->push_back(appointments_ints[appointments_ints.size() - remaining]);
                ++index;
            }

            return temp;
        } else {
            foreach (int item : appointments){
                temp->push_back(item);
            }

            return temp;
        }
    }

    /**deleteAppointment: Delete an appointment at a given index.*/
    void deleteAppointment(int index){
        appointments_ints.erase(index);
    }

    /**Implementation 2: Very long string with a separator
     * This makes deletion very difficult, but we don't really need to do that. We're just keeping a forever-record.
    */
    std::string appointments_string = "";
    const std::string separator = "|";      // This is used to separate the different appointments in the string. You should disallow this from being inputted in the frontend. This character is also flexible, you could change it if you wish.

    /**addAppointment: Adds a new appointment.
     * This appends a new appointment string followed by the separator character.
    */
    void addAppointment_string(std::string appointment){
        appointments_string += appointment + separator;
    }

    std::vector<std::string>* getRecentAppointments_string(int numberToGet){

    }

    /**Implementation 3: Appointment struct*/
};

int main()
{
    std::string path2Patient = "";
    std::cout << "Insert path to database" << std::endl;
    getline(std::cin,path2Patient);
    crow::App<crow::CORSHandler> app;

    // Customize CORS
    auto& cors = app.get_middleware<crow::CORSHandler>();

    // clang-format off
    cors
        .global()
        .headers("X-Custom-Header", "Upgrade-Insecure-Requests")
        .methods("POST"_method, "GET"_method)
        .prefix("/cors")
        .origin("example.com")
        .prefix("/nocors")
        .ignore();
    // clang-format on


    std::map<int, Patient> patients;
    std::map<int, Patient> diabetics;
    std::map<int, Patient> hypertensions;
    std::map<int, Patient> alcholics;
    std::map<int, Patient> scholars;
    std::map<int, Patient> handicaps;
    std::map<int, Patient> highRisk;
    //std::string path2Patient = "/Users/jonassegundo/Desktop/180DB/test.json";
    std::ifstream myFile(path2Patient);
    std::ostringstream tmp;
    tmp << myFile.rdbuf();
    std::string s = tmp.str();
    crow::json::rvalue jsonLoad = crow::json::load(s);
    crow::json::wvalue json(jsonLoad);


    
    for (unsigned i = 0; i < json.size(); i++) {
        crow::json::wvalue pat = json[i];
        //tst
        std::string conver = pat.dump();
        const char* dumpString = conver.c_str();
        rapidjson::Document doc;
        doc.Parse(dumpString);


        std::string name = "";
        int id = -1;
        int appointmentId = -1;
        std::string gender = "";
        std::string scheduledDay = "";
        std::string appointmentDay = "";
        int age = -1;
        std::string neighbourhood = "";
        bool scholarship = false;
        bool hypertension = false;
        bool diabetes = false;
        bool alcoholism = false;
        bool handicap = false;
        bool smsReceived = false;
        std::string noShow = "";

        if (doc.HasMember("PatientName")) {
            const rapidjson::Value& patName = doc["PatientName"];
            if (patName.IsString()) {
                name = patName.GetString();
            }
        }
        if (doc.HasMember("PatientId")) {
            const rapidjson::Value& patID = doc["PatientId"];
            if (patID.IsNumber()) {
                id = patID.GetInt();
            }
        }
        if (doc.HasMember("Age")) {
            const rapidjson::Value& patAge = doc["Age"];
            if (patAge.IsNumber()) {
                age = patAge.GetInt();
            }
        }
        if (doc.HasMember("AppointmentID")) {
            const rapidjson::Value& patAID = doc["AppointmentID"];
            if (patAID.IsNumber()) {
                appointmentId = patAID.GetInt();
            }
        }

        if (doc.HasMember("Gender")) {
            const rapidjson::Value& patGender = doc["Gender"];
            if (patGender.IsString()) {
                gender = patGender.GetString();
            }
        }
        if (doc.HasMember("ScheduledDay")) {
            const rapidjson::Value& patSDay = doc["ScheduledDay"];
            if (patSDay.IsString()) {
                scheduledDay = patSDay.GetString();
            }
        }

        if (doc.HasMember("AppointmentDay")) {
            const rapidjson::Value& patADay = doc["AppointmentDay"];
            if (patADay.IsString()) {
                appointmentDay = patADay.GetString();
            }
        }
        if (doc.HasMember("Neighbourhood")) {
            const rapidjson::Value& patN = doc["Neighbourhood"];
            if (patN.IsString()) {
                neighbourhood = patN.GetString();
            }
        }
        if (doc.HasMember("Scholarship")) {
            const rapidjson::Value& patS = doc["Scholarship"];
            if (patS.IsNumber()) {
                scholarship = patS.GetInt();
            }
        }
        if (doc.HasMember("Hipertension")) {
            const rapidjson::Value& patHype = doc["Hipertension"];
            if (patHype.IsNumber()) {
                hypertension = patHype.GetInt();
            }
        }
        if (doc.HasMember("Diabetes")) {
            const rapidjson::Value& patDia = doc["Diabetes"];
            if (patDia.IsNumber()) {
                diabetes = patDia.GetInt();
            }
        }
        if (doc.HasMember("Alcoholism")) {
            const rapidjson::Value& patAlc = doc["Alcoholism"];
            if (patAlc.IsNumber()) {
                alcoholism = patAlc.GetInt();
            }
        }
        if (doc.HasMember("Handcap")) {
            const rapidjson::Value& patHandi = doc["Handcap"];
            if (patHandi.IsNumber()) {
                handicap = patHandi.GetInt();
            }
        }
        if (doc.HasMember("SMS_received")) {
            const rapidjson::Value& patSMS = doc["SMS_received"];
            if (patSMS.IsNumber()) {
                smsReceived = patSMS.GetInt();
            }
        }
        if (doc.HasMember("No-show")) {
            const rapidjson::Value& patNS = doc["No-show"];
            if (patNS.IsString()) {
                noShow = patNS.GetString();
            }
        }
        Patient t = Patient(id, name, appointmentId, gender, scheduledDay, appointmentDay, age, neighbourhood,
            scholarship, hypertension, diabetes, alcoholism, handicap, smsReceived, noShow);
        patients.insert(std::make_pair(id, t));
        
        if(t.diabetes){
            diabetics.insert(std::make_pair(id, t));
        }
        if(t.hypertension){
            hypertensions.insert(std::make_pair(id, t));
        }
        if(t.alcoholism){
            alcholics.insert(std::make_pair(id, t));
        }
        if(t.scholarship){
            scholars.insert(std::make_pair(id, t));
        }
        if(t.handicap){
            handicaps.insert(std::make_pair(id, t));
        }
    }

    int num4ID = patients.size();
     //params
    std::vector<std::string> params;
    std::vector<std::string> params2;
    params.push_back("newName");
    params.push_back("newAge");
    params.push_back("id");
    params.push_back("newAppointID");
    params.push_back("newGend");
    params.push_back("newSched");
    params.push_back("newAppDay");
    params.push_back("newNeigh");
    params.push_back("scholar");
    params.push_back("hyperTen");
    params.push_back("diabet");
    params.push_back("alch");
    params.push_back("handi");
    params.push_back("sms");
    params.push_back("ns");
    //addPatient
    params2.push_back("newName");
    params2.push_back("newAge");
    params2.push_back("newAppointID");
    params2.push_back("newGend");
    params2.push_back("newSched");
    params2.push_back("newAppDay");
    params2.push_back("newNeigh");
    params2.push_back("scholar");
    params2.push_back("hyperTen");
    params2.push_back("diabet");
    params2.push_back("alch");
    params2.push_back("handi");
    params2.push_back("sms");
    params2.push_back("ns");
    //params.push_back("name");
    CROW_ROUTE(app, "/updatePatient")
        ([&patients, &params](const crow::request& req) {
        crow::json::wvalue x;
    auto updates = req.raw_url;

    for (unsigned i = 0; i < params.size(); i++) {
        if (updates.find(params[i]) == std::string::npos) {
            x["error"] = "Missing parameter";
            return x;
        }
    }

    //get said parameters
    auto getUpdates = req.url_params;
    std::string updateName = getUpdates.get(params[0]);
    int updateAge = atoi(getUpdates.get(params[1]));
    int id = atoi(getUpdates.get(params[2]));
    int aID = atoi(getUpdates.get(params[3]));
    std::string upGen = getUpdates.get(params[4]);
    std::string upSched = getUpdates.get(params[5]);
    std::string upADay = getUpdates.get(params[6]);
    std::string upNeigh = getUpdates.get(params[7]);

    bool schol = atoi(getUpdates.get(params[8]));
    bool hyp = atoi(getUpdates.get(params[9]));
    bool dia = atoi(getUpdates.get(params[10]));
    bool alc = atoi(getUpdates.get(params[11]));
    bool han = atoi(getUpdates.get(params[12]));
    bool sms = atoi(getUpdates.get(params[13]));
    std::string ns = getUpdates.get(params[14]);

    //get from list;
    auto i = patients.find(id);
    if (i != patients.end()) {
        std::cout << i->second.name << " " << i->second.age << std::endl;
        i->second.name = updateName;
        i->second.age = updateAge;
        i->second.appointmentId = aID;
        i->second.gender = upGen;
        i->second.scheduledDay = upSched;
        i->second.appointmentDay = upADay;
        i->second.neighbourhood = upNeigh;
        i->second.scholarship = schol;
        i->second.hypertension = hyp;
        i->second.diabetes = dia;
        i->second.alcoholism = alc;
        i->second.handicap = han;
        i->second.smsReceived = sms;
        i->second.noShow = ns;
    }
    x["PatientId"] = i->second.id;
    x["PatientName"] = i->second.name;
    x["AppointmentID"] = i->second.appointmentId;
    x["Gender"] = i->second.gender;
    x["ScheduledDay"] = i->second.scheduledDay;
    x["AppointmentDay"] = i->second.appointmentDay;
    x["Age"] = i->second.age;
    x["Neighbourhood"] = i->second.neighbourhood;
    x["Scholarship"] = i->second.scholarship ? 1 : 0;
    x["Hipertension"] = i->second.hypertension ? 1 : 0;
    x["Diabetes"] = i->second.diabetes ? 1 : 0;
    x["Alcoholism"] = i->second.alcoholism ? 1 : 0;
    x["Handcap"] = i->second.handicap ? 1 : 0;
    x["SMS_received"] = i->second.smsReceived ? 1 : 0;
    x["No-show"] = i->second.noShow;

    return x;
            });


    CROW_ROUTE(app, "/getInfo")
        ([&patients](const crow::request& req) {
        crow::json::wvalue x;
    //test
    crow::response res;

    // Set CORS headers
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Methods", "GET");
    res.set_header("Access-Control-Allow-Headers", "Content-Type");
   
    auto url = req.raw_url;
    if (url.find("id") == std::string::npos) {
        x["error"] = "Missing parameter";
        res.write(x.dump());
        return res;
    }
    auto patInf = req.url_params;
    int id = atoi(patInf.get("id"));
    if (id == 0) {
        id = 1;
    }
    auto i = patients.find(id);
            if(i==patients.end()){
                x["error"] = "No patient found";
                res.write(x.dump());
                return res;
            }
    x["PatientId"] = i->second.id;
    x["PatientName"] = i->second.name;
    x["AppointmentID"] = i->second.appointmentId;
    x["Gender"] = i->second.gender;
    x["ScheduledDay"] = i->second.scheduledDay;
    x["AppointmentDay"] = i->second.appointmentDay;
    x["Age"] = i->second.age;
    x["Neighbourhood"] = i->second.neighbourhood;
    x["Scholarship"] = i->second.scholarship ? 1 : 0;
    x["Hipertension"] = i->second.hypertension ? 1 : 0;
    x["Diabetes"] = i->second.diabetes ? 1 : 0;
    x["Alcoholism"] = i->second.alcoholism ? 1 : 0;
    x["Handcap"] = i->second.handicap ? 1 : 0;
    x["SMS_received"] = i->second.smsReceived ? 1 : 0;
    x["No-show"] = i->second.noShow;
    res.write(x.dump());
    return res;
            });

    CROW_ROUTE(app, "/deletePatient")
        ([&patients,&diabetics,&alcholics,&handicaps,&hypertensions,&scholars](const crow::request& req) {
        crow::response res;
        crow::json::wvalue x;
    // Set CORS headers
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
        auto url = req.raw_url;
    if (url.find("id") == std::string::npos) {
        x["error"] = "Missing parameter";
        res.write(x.dump());
        return res;
    }
    auto patInf = req.url_params;
    int id = atoi(patInf.get("id"));
    if (id == 0) {
        id = 1;
    }
    auto i = patients.erase(id);
            
    if(!i){
        x["error"] = "No patient found";
        res.write(x.dump());
        return res;
    }
            auto o = diabetics.erase(id);
            o = alcholics.erase(id);
            o = handicaps.erase(id);
            o = scholars.erase(id);
            o = hypertensions.erase(id);
    res.write("Success!");
    return res;
            });

 
    CROW_ROUTE(app, "/dog")
        .methods("GET"_method)
        ([](const crow::request& req) {
        crow::response res;

    // Set CORS headers
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Methods", "GET");
    res.set_header("Access-Control-Allow-Headers", "Content-Type");

    res.write("Hello, World!");
    res.code = 200;
    return res;
            });
    
    CROW_ROUTE(app, "/random20")
        .methods("GET"_method)
        ([&patients](const crow::request& req) {
        crow::response res;
            

    // Set CORS headers
            res.set_header("Access-Control-Allow-Origin", "*");
            res.set_header("Access-Control-Allow-Methods", "GET");
            res.set_header("Access-Control-Allow-Headers", "Content-Type");
            crow::json::wvalue x;
            int numPat = 20;
            if(patients.size() < 20){
                numPat = patients.size();
            }
            for(unsigned i = 0; i < numPat;i++){
                auto per = patients.find(rand()%patients.size());
                x[i]["PatientId"] = per->second.id;
                x[i]["PatientName"] = per->second.name;
                x[i]["AppointmentID"] = per->second.appointmentId;
                x[i]["Gender"] = per->second.gender;
                x[i]["ScheduledDay"] = per->second.scheduledDay;
                x[i]["AppointmentDay"] = per->second.appointmentDay;
                x[i]["Age"] = per->second.age;
                x[i]["Neighbourhood"] = per->second.neighbourhood;
                x[i]["Scholarship"] = per->second.scholarship ? 1 : 0;
                x[i]["Hipertension"] = per->second.hypertension ? 1 : 0;
                x[i]["Diabetes"] = per->second.diabetes ? 1 : 0;
                x[i]["Alcoholism"] = per->second.alcoholism ? 1 : 0;
                x[i]["Handcap"] = per->second.handicap ? 1 : 0;
                x[i]["SMS_received"] = per->second.smsReceived ? 1 : 0;
                x[i]["No-show"] = per->second.noShow;
            }
            res.write(x.dump());
    
    return res;
            });
    
    
    CROW_ROUTE(app, "/addPatient")
        ([&patients, &params2,&num4ID](const crow::request& req) {
        crow::json::wvalue x;
    auto updates = req.raw_url;

    for (unsigned i = 0; i < params2.size(); i++) {
        if (updates.find(params2[i]) == std::string::npos) {
            std::string miss = params2[i];
            x["error"] = "Missing parameter: "+miss;
            return x;
        }
    }

    //get said parameters
    auto getUpdates = req.url_params;
    std::string updateName = getUpdates.get(params2[0]);
    int updateAge = atoi(getUpdates.get(params2[1]));
    int aID = atoi(getUpdates.get(params2[2]));
    std::string upGen = getUpdates.get(params2[3]);
    std::string upSched = getUpdates.get(params2[4]);
    std::string upADay = getUpdates.get(params2[5]);
    std::string upNeigh = getUpdates.get(params2[6]);
    bool schol = atoi(getUpdates.get(params2[7]));
    bool hyp = atoi(getUpdates.get(params2[8]));
    bool dia = atoi(getUpdates.get(params2[9]));
    bool alc = atoi(getUpdates.get(params2[10]));
    bool han = atoi(getUpdates.get(params2[11]));
    bool sms = atoi(getUpdates.get(params2[12]));
    std::string ns = getUpdates.get(params2[13]);

    //get from list;
        Patient i;
        i.id = num4ID+1;
            num4ID++;
        i.name = updateName;
        i.age = updateAge;
        i.appointmentId = aID;
        i.gender = upGen;
        i.scheduledDay = upSched;
        i.appointmentDay = upADay;
        i.neighbourhood = upNeigh;
        i.scholarship = schol;
        i.hypertension = hyp;
        i.diabetes = dia;
        i.alcoholism = alc;
        i.handicap = han;
        i.smsReceived = sms;
        i.noShow = ns;
        patients.insert(std::make_pair(i.id, i));
    x["PatientId"] = i.id;
    x["PatientName"] = i.name;
    x["AppointmentID"] = i.appointmentId;
    x["Gender"] = i.gender;
    x["ScheduledDay"] = i.scheduledDay;
    x["AppointmentDay"] = i.appointmentDay;
    x["Age"] = i.age;
    x["Neighbourhood"] = i.neighbourhood;
    x["Scholarship"] = i.scholarship ? 1 : 0;
    x["Hipertension"] = i.hypertension ? 1 : 0;
    x["Diabetes"] = i.diabetes ? 1 : 0;
    x["Alcoholism"] = i.alcoholism ? 1 : 0;
    x["Handcap"] = i.handicap ? 1 : 0;
    x["SMS_received"] = i.smsReceived ? 1 : 0;
    x["No-show"] = i.noShow;

    return x;
            });
    
    CROW_ROUTE(app, "/last20")
        .methods("GET"_method)
        ([&patients](const crow::request& req) {
        crow::response res;
            

    // Set CORS headers
            res.set_header("Access-Control-Allow-Origin", "*");
            res.set_header("Access-Control-Allow-Methods", "GET");
            res.set_header("Access-Control-Allow-Headers", "Content-Type");
            crow::json::wvalue x;
            int numPat = 20;
            int index = 0;
            if(patients.size() < 20){
                numPat = patients.size();
            }
            for(auto i = patients.rbegin(); index < numPat; i++){
                auto per = i;
                x[index]["PatientId"] = per->second.id;
                x[index]["PatientName"] = per->second.name;
                x[index]["AppointmentID"] = per->second.appointmentId;
                x[index]["Gender"] = per->second.gender;
                x[index]["ScheduledDay"] = per->second.scheduledDay;
                x[index]["AppointmentDay"] = per->second.appointmentDay;
                x[index]["Age"] = per->second.age;
                x[index]["Neighbourhood"] = per->second.neighbourhood;
                x[index]["Scholarship"] = per->second.scholarship ? 1 : 0;
                x[index]["Hipertension"] = per->second.hypertension ? 1 : 0;
                x[index]["Diabetes"] = per->second.diabetes ? 1 : 0;
                x[index]["Alcoholism"] = per->second.alcoholism ? 1 : 0;
                x[index]["Handcap"] = per->second.handicap ? 1 : 0;
                x[index]["SMS_received"] = per->second.smsReceived ? 1 : 0;
                x[index]["No-show"] = per->second.noShow;
                index++;
            }
            std::cout << x.size() << std::endl;
            res.write(x.dump());
    
    return res;
            });
    
    
    CROW_ROUTE(app, "/last20Dia")
        .methods("GET"_method)
        ([&diabetics](const crow::request& req) {
        crow::response res;
            

    // Set CORS headers
            res.set_header("Access-Control-Allow-Origin", "*");
            res.set_header("Access-Control-Allow-Methods", "GET");
            res.set_header("Access-Control-Allow-Headers", "Content-Type");
            crow::json::wvalue x;
            int numPat = 20;
            int index = 0;
            if(diabetics.size() < 20){
                numPat = diabetics.size();
            }
            for(auto i = diabetics.rbegin(); index < numPat; i++){
                auto per = i;
                x[index]["PatientId"] = per->second.id;
                x[index]["PatientName"] = per->second.name;
                x[index]["AppointmentID"] = per->second.appointmentId;
                x[index]["Gender"] = per->second.gender;
                x[index]["ScheduledDay"] = per->second.scheduledDay;
                x[index]["AppointmentDay"] = per->second.appointmentDay;
                x[index]["Age"] = per->second.age;
                x[index]["Neighbourhood"] = per->second.neighbourhood;
                x[index]["Scholarship"] = per->second.scholarship ? 1 : 0;
                x[index]["Hipertension"] = per->second.hypertension ? 1 : 0;
                x[index]["Diabetes"] = per->second.diabetes ? 1 : 0;
                x[index]["Alcoholism"] = per->second.alcoholism ? 1 : 0;
                x[index]["Handcap"] = per->second.handicap ? 1 : 0;
                x[index]["SMS_received"] = per->second.smsReceived ? 1 : 0;
                x[index]["No-show"] = per->second.noShow;
                index++;
            }
            std::cout << x.size() << std::endl;
            res.write(x.dump());
    
    return res;
            });
    
    
    CROW_ROUTE(app, "/last20Hyper")
        .methods("GET"_method)
        ([&hypertensions](const crow::request& req) {
        crow::response res;
            

    // Set CORS headers
            res.set_header("Access-Control-Allow-Origin", "*");
            res.set_header("Access-Control-Allow-Methods", "GET");
            res.set_header("Access-Control-Allow-Headers", "Content-Type");
            crow::json::wvalue x;
            int numPat = 20;
            int index = 0;
            if(hypertensions.size() < 20){
                numPat = hypertensions.size();
            }
            for(auto i = hypertensions.rbegin(); index < numPat; i++){
                auto per = i;
                x[index]["PatientId"] = per->second.id;
                x[index]["PatientName"] = per->second.name;
                x[index]["AppointmentID"] = per->second.appointmentId;
                x[index]["Gender"] = per->second.gender;
                x[index]["ScheduledDay"] = per->second.scheduledDay;
                x[index]["AppointmentDay"] = per->second.appointmentDay;
                x[index]["Age"] = per->second.age;
                x[index]["Neighbourhood"] = per->second.neighbourhood;
                x[index]["Scholarship"] = per->second.scholarship ? 1 : 0;
                x[index]["Hipertension"] = per->second.hypertension ? 1 : 0;
                x[index]["Diabetes"] = per->second.diabetes ? 1 : 0;
                x[index]["Alcoholism"] = per->second.alcoholism ? 1 : 0;
                x[index]["Handcap"] = per->second.handicap ? 1 : 0;
                x[index]["SMS_received"] = per->second.smsReceived ? 1 : 0;
                x[index]["No-show"] = per->second.noShow;
                index++;
            }
            std::cout << x.size() << std::endl;
            res.write(x.dump());
    
    return res;
            });
    
    CROW_ROUTE(app, "/last20Schol")
        .methods("GET"_method)
        ([&scholars](const crow::request& req) {
        crow::response res;
            

    // Set CORS headers
            res.set_header("Access-Control-Allow-Origin", "*");
            res.set_header("Access-Control-Allow-Methods", "GET");
            res.set_header("Access-Control-Allow-Headers", "Content-Type");
            crow::json::wvalue x;
            int numPat = 20;
            int index = 0;
            if(scholars.size() < 20){
                numPat = scholars.size();
            }
            for(auto i = scholars.rbegin(); index < numPat; i++){
                auto per = i;
                x[index]["PatientId"] = per->second.id;
                x[index]["PatientName"] = per->second.name;
                x[index]["AppointmentID"] = per->second.appointmentId;
                x[index]["Gender"] = per->second.gender;
                x[index]["ScheduledDay"] = per->second.scheduledDay;
                x[index]["AppointmentDay"] = per->second.appointmentDay;
                x[index]["Age"] = per->second.age;
                x[index]["Neighbourhood"] = per->second.neighbourhood;
                x[index]["Scholarship"] = per->second.scholarship ? 1 : 0;
                x[index]["Hipertension"] = per->second.hypertension ? 1 : 0;
                x[index]["Diabetes"] = per->second.diabetes ? 1 : 0;
                x[index]["Alcoholism"] = per->second.alcoholism ? 1 : 0;
                x[index]["Handcap"] = per->second.handicap ? 1 : 0;
                x[index]["SMS_received"] = per->second.smsReceived ? 1 : 0;
                x[index]["No-show"] = per->second.noShow;
                index++;
            }
            std::cout << x.size() << std::endl;
            res.write(x.dump());
    
    return res;
            });
    
    CROW_ROUTE(app, "/last20Handi")
        .methods("GET"_method)
        ([&handicaps](const crow::request& req) {
        crow::response res;
            

    // Set CORS headers
            res.set_header("Access-Control-Allow-Origin", "*");
            res.set_header("Access-Control-Allow-Methods", "GET");
            res.set_header("Access-Control-Allow-Headers", "Content-Type");
            crow::json::wvalue x;
            int numPat = 20;
            int index = 0;
            if(handicaps.size() < 20){
                numPat = handicaps.size();
            }
            for(auto i = handicaps.rbegin(); index < numPat; i++){
                auto per = i;
                x[index]["PatientId"] = per->second.id;
                x[index]["PatientName"] = per->second.name;
                x[index]["AppointmentID"] = per->second.appointmentId;
                x[index]["Gender"] = per->second.gender;
                x[index]["ScheduledDay"] = per->second.scheduledDay;
                x[index]["AppointmentDay"] = per->second.appointmentDay;
                x[index]["Age"] = per->second.age;
                x[index]["Neighbourhood"] = per->second.neighbourhood;
                x[index]["Scholarship"] = per->second.scholarship ? 1 : 0;
                x[index]["Hipertension"] = per->second.hypertension ? 1 : 0;
                x[index]["Diabetes"] = per->second.diabetes ? 1 : 0;
                x[index]["Alcoholism"] = per->second.alcoholism ? 1 : 0;
                x[index]["Handcap"] = per->second.handicap ? 1 : 0;
                x[index]["SMS_received"] = per->second.smsReceived ? 1 : 0;
                x[index]["No-show"] = per->second.noShow;
                index++;
            }
            std::cout << x.size() << std::endl;
            res.write(x.dump());
    
    return res;
            });
    
    CROW_ROUTE(app, "/last20Alc")
        .methods("GET"_method)
        ([&alcholics](const crow::request& req) {
        crow::response res;
            

    // Set CORS headers
            res.set_header("Access-Control-Allow-Origin", "*");
            res.set_header("Access-Control-Allow-Methods", "GET");
            res.set_header("Access-Control-Allow-Headers", "Content-Type");
            crow::json::wvalue x;
            int numPat = 20;
            int index = 0;
            if(alcholics.size() < 20){
                numPat = alcholics.size();
            }
            for(auto i = alcholics.rbegin(); index < numPat; i++){
                auto per = i;
                x[index]["PatientId"] = per->second.id;
                x[index]["PatientName"] = per->second.name;
                x[index]["AppointmentID"] = per->second.appointmentId;
                x[index]["Gender"] = per->second.gender;
                x[index]["ScheduledDay"] = per->second.scheduledDay;
                x[index]["AppointmentDay"] = per->second.appointmentDay;
                x[index]["Age"] = per->second.age;
                x[index]["Neighbourhood"] = per->second.neighbourhood;
                x[index]["Scholarship"] = per->second.scholarship ? 1 : 0;
                x[index]["Hipertension"] = per->second.hypertension ? 1 : 0;
                x[index]["Diabetes"] = per->second.diabetes ? 1 : 0;
                x[index]["Alcoholism"] = per->second.alcoholism ? 1 : 0;
                x[index]["Handcap"] = per->second.handicap ? 1 : 0;
                x[index]["SMS_received"] = per->second.smsReceived ? 1 : 0;
                x[index]["No-show"] = per->second.noShow;
                index++;
            }
            std::cout << x.size() << std::endl;
            res.write(x.dump());
    
    return res;
            });
    
    
    CROW_ROUTE(app, "/logout")
            .methods("GET"_method)
            ([&patients](const crow::request& req) {
            crow::response res;
            res.set_header("Access-Control-Allow-Origin", "*");
            res.set_header("Access-Control-Allow-Methods", "GET");
            res.set_header("Access-Control-Allow-Headers", "Content-Type");
            crow::json::wvalue x;
            int total = patients.size();
            int fileInd = 0;
            for (unsigned i = 1; i <= total; i++) {
                auto per = patients.find(i);
                if (per == patients.end()) {
                    total++;
                    continue;
                }
                x[fileInd]["PatientId"] = per->second.id;
                x[fileInd]["PatientName"] = per->second.name;
                x[fileInd]["AppointmentID"] = per->second.appointmentId;
                x[fileInd]["Gender"] = per->second.gender;
                x[fileInd]["ScheduledDay"] = per->second.scheduledDay;
                x[fileInd]["AppointmentDay"] = per->second.appointmentDay;
                x[fileInd]["Age"] = per->second.age;
                x[fileInd]["Neighbourhood"] = per->second.neighbourhood;
                x[fileInd]["Scholarship"] = per->second.scholarship ? 1 : 0;
                x[fileInd]["Hipertension"] = per->second.hypertension ? 1 : 0;
                x[fileInd]["Diabetes"] = per->second.diabetes ? 1 : 0;
                x[fileInd]["Alcoholism"] = per->second.alcoholism ? 1 : 0;
                x[fileInd]["Handcap"] = per->second.handicap ? 1 : 0;
                x[fileInd]["SMS_received"] = per->second.smsReceived ? 1 : 0;
                x[fileInd]["No-show"] = per->second.noShow;
                fileInd++;
            }
            std::ofstream outputFile("/Users/jonassegundo/Desktop/180DB/test1.json");
            std::string out = x.dump();
            outputFile << out;
            outputFile.close();
                return res;
                });
    
    
    
    app.port(3000).multithreaded().run();
}

//http://0.0.0.0:3000/updatePatient?newName=Jack&newAge=20&newAppointID=213213213&newGend=M&newSched=1/2/3&newAppDay=1/2/3&newNeigh=Oakland&scholar=0&hyperTen=1&diabet=0&alch=1&handi=1&sms=1&ns=yes

//http://0.0.0.0:3000/addPatient?newName=Jack&newAge=20&id=1&newAppointID=213213213&newGend=M&newSched=1/2/3&newAppDay=1/2/3&newNeigh=Oakland&scholar=0&hyperTen=1&diabet=0&alch=1&handi=1&sms=1&ns=yes

//std::string path2Patient = "C:\\Users\\PC\\Desktop\\CS180DB\\test.json";

