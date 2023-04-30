#include <iostream>
#include <crow.h>
#include <string>
#include <filesystem>
#include <fstream>
#include <sstream>
#include <vector>
#include "rapidjson/document.h"
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

    Patient(int id, std::string name, int appointmentId,std::string gender,std::string scheduledDay,std::string appointmentDay, int age,
        std::string neighbourhood, bool scholarship, bool hypertension, bool diabetes, bool alcoholism,bool handicap, bool smsReceived, std::string noShow) : id(id), name(name),
        appointmentId(appointmentId),gender(gender),scheduledDay(scheduledDay),appointmentDay(appointmentDay), age(age),neighbourhood(neighbourhood)
            ,scholarship(scholarship),hypertension(hypertension),diabetes(diabetes),alcoholism(alcoholism),handicap(handicap), smsReceived(smsReceived)
    ,noShow(noShow){};
};

int main()
{
   // std::vector<Patient> patients;
    std::unordered_map<int, Patient> patients;
    crow::SimpleApp app;
    //tst
    
    std::string path2Patient = "/Users/jonassegundo/Desktop/180DB/test.json";
    std::ifstream myFile(path2Patient);
    std::ostringstream tmp;
    tmp << myFile.rdbuf();
    std::string s = tmp.str();
    crow::json::rvalue jsonLoad = crow::json::load(s);
    crow::json::wvalue json(jsonLoad);


    //tst
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
    }

    //tst
    

     //params
    std::vector<std::string> params;

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
    //params.push_back("name");
    CROW_ROUTE(app, "/updatePatient")
        ([&patients, &params](const crow::request& req) {
            crow::json::wvalue x;
            auto updates = req.raw_url;
        
            for(unsigned i = 0; i<params.size();i++){
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
            if(i!=patients.end()){
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
            x["PatientName"] =i->second.name;
            x["AppointmentID"] =i->second.appointmentId;
            x["Gender"] = i->second.gender;
            x["ScheduledDay"] = i->second.scheduledDay;
            x["AppointmentDay"] = i->second.appointmentDay;
            x["Age"] = i->second.age;
            x["Neighbourhood"] = i->second.neighbourhood;
            x["Scholarship"] = i->second.scholarship?1:0;
            x["Hipertension"] = i->second.hypertension?1:0;
            x["Diabetes"] = i->second.diabetes?1:0;
            x["Alcoholism"] = i->second.alcoholism?1:0;
            x["Handcap"] = i->second.handicap?1:0;
            x["SMS_received"] = i->second.smsReceived?1:0;
            x["No-show"] =i->second.noShow;
            
            return x;
            });


    CROW_ROUTE(app, "/getInfo")
    ([&patients](const crow::request& req) {
        crow::json::wvalue x;
        auto url = req.raw_url;
        if(url.find("id") == std::string::npos){
            x["error"] = "Missing parameter";
            return x;
        }
        auto patInf = req.url_params;
        int id = atoi(patInf.get("id"));
        auto i = patients.find(id);
        x["PatientId"] = i->second.id;
        x["PatientName"] =i->second.name;
        x["AppointmentID"] =i->second.appointmentId;
        x["Gender"] = i->second.gender;
        x["ScheduledDay"] = i->second.scheduledDay;
        x["AppointmentDay"] = i->second.appointmentDay;
        x["Age"] = i->second.age;
        x["Neighbourhood"] = i->second.neighbourhood;
        x["Scholarship"] = i->second.scholarship?1:0;
        x["Hipertension"] = i->second.hypertension?1:0;
        x["Diabetes"] = i->second.diabetes?1:0;
        x["Alcoholism"] = i->second.alcoholism?1:0;
        x["Handcap"] = i->second.handicap?1:0;
        x["SMS_received"] = i->second.smsReceived?1:0;
        x["No-show"] =i->second.noShow;
        
        return x;
    });
    
    CROW_ROUTE(app, "/deletePatient")
        ([&patients](const crow::request& req) {
        auto updates = req.url_params;
    crow::json::wvalue x;
    return x;
            });
    app.port(3000).multithreaded().run();
}

//http://0.0.0.0:3000/updatePatient?newName=Jack&newAge=20&id=1&newAppointID=213213213&newGend=M&newSched=1/2/3&newAppDay=1/2/3&newNeigh=Oakland&scholar=0&hyperTen=1&diabet=0&alch=1&handi=1&sms=1&ns=yes

