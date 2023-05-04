#ifndef PATIENT_H
#define PATIENT_H

#include <string>

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
        std::string neighbourhood, bool scholarship, bool hypertension, bool diabetes, bool alcoholism, bool handicap, bool smsReceived, std::string noShow);

    // other member functions
};

#endif