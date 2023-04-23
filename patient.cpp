#include <iostream>

class Patient{
    /**Fields are corresponding to the dataset provided in the following URL:
     * https://www.kaggle.com/datasets/joniarroba/noshowappointments
    */
    public:
        int id;
        int appointment_id;
        std::string gender;
        std::string scheduled_date;
        std::string appointment_date;
        int age;
        std::string neighborhood;
        bool scholarship;
        bool hypertension;
        bool diabetes;
        bool alcoholism;
        bool handicap;
        bool sms_received;
        bool no_show;

    Patient(int id, int appointment_id, std::string &gender, std::string &scheduled_date, std::string &appointment_date, 
            int age, std::string &neighborhood, bool scholarship, bool hypertension, bool diabetes, bool alcoholism,
            bool handicap, bool sms_received, bool no_show) : id(id), appointment_id(appointment_id), gender(gender), 
            scheduled_date(scheduled_date), appointment_date(appointment_date), age(age), neighborhood(neighborhood), 
            scholarship(scholarship), hypertension(hypertension), diabetes(diabetes), alcoholism(alcoholism), 
            handicap(handicap), sms_received(sms_received), no_show(no_show) {};
};