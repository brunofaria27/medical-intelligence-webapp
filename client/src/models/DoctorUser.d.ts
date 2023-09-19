export interface DoctorUser {
    name: string
    email: string
    password: string
    doctor_category: string
    doctorClinic: DoctorClinic
    userType: string
}