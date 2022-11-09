const bookingModel = require("../model/bookingSchema")
const input = require("../validator/validations")
const vendorModel = require("../model/vendorSchema")
const userModel = require("../model/userSchema")
const createBooking = async (req, res) => {

    try {


        if (!input.isValidRequestBody(req.body)) {
            res.status(400).send({ status: false, message: "No data provided" })
            return
        }

        const { context, bookingId, sourceType, status, customer, source, destination, vendor, bookingTime, pickupTime } = req.body

        const { id, fullName, mobile, email } = customer

        const mainErrMsg = input.isAllPresent({ context, sourceType, bookingId, status, customer, source, destination, vendor, bookingTime, pickupTime }, { customer: "obj", source: "obj", destination: "obj", vendor: "obj" })

        const coustomerErrMsg = input.isAllPresent({ "customer's id": id, "customer's fullName": fullName, "customer's mobile": mobile, "customer's email": email }, { "customer's id": "num" })

        const { id: vId, fullName: vFullName, vehicleNumber, vehicleModel } = vendor

        const { name: sName, address: sAddress, latitude: sLatitude, longitude: sLongitude } = source

        const { address: sSAddress, location: sLocation, city: sCity, state: sState, postalCode: sPostalCode, country: sCountry } = sAddress

        const { name: dName, address: dAddress } = destination

        const { latitude: dLatitude, longitude: dLongitude } = destination.address.coordinates


        const { address: dSAddress, location: dLocation, city: dCity, state: dState, postalCode: dPostalCode, country: dCountry } = dAddress

        const vendorErrMsg = input.isAllPresent({ "vendor's id": vId, "vendor's fullName": vFullName, "vendor's Vehicle Number ": vehicleNumber, "vendor's Vehicle Model": vehicleModel }, { "vendor's id": "num" })

        const sourceErrMsg = input.isAllPresent({ "source Name ": sName, "source Address": sAddress, "source latitude": sLatitude, "source Longitude": sLongitude }, { "source Address": "obj" })

        const sourceAddressErrMsg = input.isAllPresent({ "source sub Address": sSAddress, "source Address location": sLocation, "source Address City": sCity, "source Address State": sState, "source postal Code": sPostalCode, "source Address country": sCountry })

        const destinationErrMsg = input.isAllPresent({ "destination Name ": dName, "destination Address": dAddress, "destination latitude": dLatitude, "destination Longitude": dLongitude }, { "destination Address": "obj" })

        const destinationAddressErrMsg = input.isAllPresent({ "destination Address": dSAddress, "destination Address location": dLocation, "destination Address City": dCity, "destination Address State": dState, "destination postal Code": dPostalCode, "destination Address country": dCountry })

        if (mainErrMsg || coustomerErrMsg || vendorErrMsg || sourceErrMsg || sourceAddressErrMsg || destinationErrMsg || destinationAddressErrMsg) {
            return res.status(400).send({ status: false, message: mainErrMsg || coustomerErrMsg || vendorErrMsg || sourceErrMsg || sourceAddressErrMsg || destinationErrMsg || destinationAddressErrMsg })
        }

        const mobileReg = /^[+]?[0-9]{1,2} \d{10,}$/;
        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const date = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-\d{2}:\d{2}$/


        if (!mobileReg.test(mobile.trim()))
            return res.status(400).send({ status: false, message: "customer's mobile number should have +91 XXXXXXXXXX format" })



        if (!emailReg.test(email.trim()))
            return res.status(400).send({ status: false, message: "customer's email is not have email structure" })

        if (!(date.test(bookingTime.trim())))
            return res.status(400).send({ status: false, message: "booking time should have format like 2020-08-31T11:15:22-06:00" })

        if (!(date.test(pickupTime.trim())))
            return res.status(400).send({ status: false, message: "pickup time should have format like 2020-08-31T11:15:22-06:00" })

        if (!(/^\d*$/.test(bookingId.trim())))
            return res.status(400).send({ status: false, message: "bookingId should have only digits " })


        const userData = { id, fullName, mobile, email }

        const userSavedData = await userModel.create(userData)

        const vendorData = { id: vId, fullName: vFullName, vehicleNumber, vehicleModel }

        const vendorSavedData = await vendorModel.create(vendorData)

        const bookingData = { context, bookingId, sourceType, status, source, destination, bookingTime: new Date(bookingTime), pickupTime: new Date(pickupTime) }

        const bookingSavedData = await bookingModel.create(bookingData)

        res.status(201).send({ status: true, message: "Data Saved Successfully", data: { bookingData: bookingSavedData, userData: userSavedData, vendorData: vendorSavedData } })


    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }


}

module.exports = { createBooking }