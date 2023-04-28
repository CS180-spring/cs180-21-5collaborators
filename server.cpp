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
    int age;

    Patient(int id, std::string name, int age) : id(id), name(name), age(age) {};
};

int main()
{
    std::vector<Patient> patients;

    crow::SimpleApp app;
    //tst
    
    std::string path2Patient = "C:\\Users\\PC\\Desktop\\CS180DB\\test.json";
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
        int age = -1;
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
        patients.push_back(Patient(id, name, age));
    }

    //tst
    

     //params
    std::vector<std::string> params;
    params.push_back("newName");
    params.push_back("newAge");
    params.push_back("id");
    params.push_back("name");
    CROW_ROUTE(app, "/updatePatient")
        ([&patients, &params](const crow::request& req) {
        crow::json::wvalue x;
    auto updates = req.raw_url;
    auto loc = updates.find(params[0]);
    auto loc2 = updates.find(params[1]);
    auto loc3 = updates.find(params[2]);
    auto loc4 = updates.find(params[3]);
    // make sure parameters met
    if (loc == std::string::npos) {
        x["error"] = "Missing parameter";
        return x;
    }
    if (loc2 == std::string::npos) {
        x["error"] = "Missing parameter";
        return x;
    }
    if (loc3 == std::string::npos) {
        x["error"] = "Missing parameter";
        return x;

    }
    if (loc4 == std::string::npos) {
        x["error"] = "Missing parameter";
        return x;

    }
    //get said parameters
    auto getUpdates = req.url_params;
    std::string updateName = getUpdates.get(params[0]);
    int updateAge = atoi(getUpdates.get(params[1]));
    int id = atoi(getUpdates.get(params[2]));
    std::string name = getUpdates.get(params[3]);
    name[0] = std::toupper(name[0]);
    std::string dirName(1, name[0]);
    std::string path2Patient = "/Users/jonassegundo/Desktop/180DB/" + dirName + "/" + name + ".json";
    std::ifstream myFile(path2Patient);
    if (!myFile) {
        x["patient"] = "NOTFOUND";
        return x;
    }

    std::ostringstream tmp;
    tmp << myFile.rdbuf();
    std::string s = tmp.str();
    std::cout << s << std::endl;
    crow::json::rvalue jsonLoad = crow::json::load(s);
    crow::json::wvalue json(jsonLoad);

    //std::cout << Test.name << std::endl;
    //crow::json::wvalue o;
    if (updateName != "") {
        json["Name"] = updateName;
    }
    if (updateAge) {
        json["Age"] = updateAge;
    }
    std::string outString = json.dump();
    return json;
    //return json;
 // return x;
            });


    CROW_ROUTE(app, "/deletePatient")
        ([&patients](const crow::request& req) {
        auto updates = req.url_params;
    int id = atoi(updates.get("id"));
    std::cout << id << std::endl;
    for (unsigned i = 0; i < patients.size(); i++) {
        if (patients[i].id == id) {
            patients.erase(patients.begin() + i);
        }
    }

    crow::json::wvalue x;
    return x;
            });
    app.port(3000).multithreaded().run();
}