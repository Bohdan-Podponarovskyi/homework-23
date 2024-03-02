import {
    Card,
    Input,
    Button,
    Typography,
    Alert
} from "@material-tailwind/react";
import {useFormik} from "formik";
import {useState} from "react";

const validateForm = (values) => {
    const errors = {};
    const letters = /^[A-Za-z]+$/;
    const phoneNo = /^([0-9]{12})$/;

    if (!values.name) {
        errors.name = 'Name is required';
    } else if (!values.name.match(letters)) {
        errors.name = 'Name should contain only letters';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = 'Invalid email format';
    }

    if (!values.phone) {
        errors.phone = 'Phone is required';
    } else if (!values.phone.match(phoneNo)) {
        errors.phone = 'Invalid phone number format';
    }

    return errors;
}

export function Form() {
    const [showAlert, setShowAlert] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: ''
        },
        validate: validateForm,
        validateOnChange: {},
        onSubmit: () => {
            setShowAlert(true)
        }
    })

    return (
        <Card color="transparent" shadow={true} className="p-4">
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Name
                    </Typography>
                    <Input
                        required
                        type="text"
                        name="name"
                        size="lg"
                        placeholder="name"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name &&
                        <Typography variant="small" color="red">
                            {formik.errors.name}
                        </Typography>
                    }
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Your Email
                    </Typography>
                    <Input
                        required
                        type="email"
                        name="email"
                        size="lg"
                        placeholder="example@example.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email &&
                        <Typography variant="small" color="red">
                            {formik.errors.email}
                        </Typography>
                    }
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Phone
                    </Typography>
                    <Input
                        required
                        type="text"
                        name="phone"
                        size="lg"
                        placeholder="+380939998877"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone &&
                        <Typography variant="small" color="red">
                            {formik.errors.phone}
                        </Typography>
                    }
                </div>
                <Button type="submit" className="mt-6" fullWidth>
                    submit
                </Button>
            </form>
            {showAlert && <Alert color="green">Submitted successfully.</Alert>}
        </Card>
    );
}