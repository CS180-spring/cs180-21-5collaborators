#include <iostream>
#include <crow.h>
#include <string>
#include "crow.h"
//#include "crow_all.h"

//simplified patient
class Patient{
    public:
    int id;
    std::string name;
    int age;

    Patient(int id, std::string name,int age) : id(id),name(name),age(age){};
};

int main()
{
    crow::SimpleApp app;
    std::vector<Patient> patients;
    Patient Test(0,"Bob",45);
    Patient Test1(1,"Rob",40);
    patients.push_back(Test);
    patients.push_back(Test1);
    std::vector<std::string> params;
    params.push_back("newName");
    params.push_back("newAge");
    params.push_back("id");
    CROW_ROUTE(app, "/updatePatient")
    ([&patients,&params](const crow::request& req){
        crow::json::wvalue x;
        auto updates = req.raw_url;
        auto loc = updates.find(params[0]);
        auto loc2 = updates.find(params[1]);
        auto loc3 = updates.find(params[2]);
        // make sure parameters met
        if(loc==std::string::npos){
            x["error"] = "Missing parameter";
            return x;
        }
        if(loc2==std::string::npos){
            x["error"] = "Missing parameter";
            return x;
        }
        if(loc3==std::string::npos){
            x["error"] = "Missing parameter";
            return x;
            
        }
        //get said parameters
        auto getUpdates = req.url_params;
        auto updateName = getUpdates.get(params[0]);
        int updateAge = atoi(getUpdates.get(params[1]));
        int id = atoi(getUpdates.get(params[2]));
        
        
        std::cout << id << std::endl;
        Patient* updatedPat = nullptr;
        for(unsigned i =0; i < patients.size();i++){
            if(patients[i].id == id){
                std::string nName = updateName;
                patients[i].name = (nName!="")?updateName:patients[i].name;
                patients[i].age = updateAge?updateAge:patients[i].age;
                updatedPat = &patients[i];
            }
        }
        if(updatedPat== nullptr){
            x["patient"] = "NOTFOUND";
            return x;
        }
        x["newName"] = updatedPat->name;
        x["newAge"] = updatedPat->age;
        //std::cout << Test.name << std::endl;
        return x;
     // return x;
    });
    
    
    CROW_ROUTE(app, "/deletePatient")
       ([&patients](const crow::request& req){
           auto updates = req.url_params;
           int id = atoi(updates.get("id"));
           std::cout << id << std::endl;
           for(unsigned i =0; i < patients.size();i++){
               if(patients[i].id == id){
                   patients.erase(patients.begin()+i);
               }
           }
           
           crow::json::wvalue x;
           return x;
       });
    app.port(3000).multithreaded().run();
}

