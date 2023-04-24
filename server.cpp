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
    Patient Test(1,"Bob",45);
    CROW_ROUTE(app, "/updatePatient")
    ([&Test](const crow::request& req){
        auto updates = req.url_params;
        auto updateName = updates.get("newName");
        Test.name = updateName;
        crow::json::wvalue x;
        x["message"] = Test.name;
        std::cout << Test.name << std::endl;
        return x;
     // return x;
    });
    app.port(3000).multithreaded().run();
}

