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
    CROW_ROUTE(app, "/updatePatient")
    ([&patients](const crow::request& req){
        auto updates = req.url_params;
        auto updateName = updates.get("newName");
        int id = atoi(updates.get("id"));
        std::cout << id << std::endl;
        Patient* updatedPat = nullptr;
        for(unsigned i =0; i < patients.size();i++){
            if(patients[i].id == id){
                patients[i].name = updateName;
                updatedPat = &patients[i];
            }
        }
        crow::json::wvalue x;
        x["message"] = updatedPat->name;
        //std::cout << Test.name << std::endl;
        return x;
     // return x;
    });

    CROW_ROUTE(app, "/deletePatient")
    ([&patients](const crow::request& req){
        auto updates = req.url_params;
        int id = atoi(updates.get("id"));
        std::cout << id << std::endl;
        
        crow::json::wvalue x;
        x.delete(id);

        return x;
    });

    app.port(3000).multithreaded().run();
}

