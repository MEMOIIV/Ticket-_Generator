import Joi from "joi";
import { useEffect, useState } from "react";
function Home() {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required().label("Username"),
        email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
        githubUsername: Joi.string()
        .min(3)
        .max(30)
        .required()
        .label("githubUsername"),
        avatar: Joi.string().required().label("Avatar"),
    });

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        githubUsername: "",
        avatar: "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "avatar" && files && files[0]) {
        const file = files[0];

        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            setErrors((prevState) => ({
            ...prevState,
            avatar: "Please upload an image file (JPG or PNG OR GIF)",
            }));
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setFormData((prevState) => ({
            ...prevState,
            avatar: event.target.result, // تحويل الصورة إلى Base64
            }));
            setErrors((prevState) => ({
            ...prevState,
            avatar: "",
            }));
        };
        reader.readAsDataURL(file);
        } else {
        setFormData({
            ...formData,
            [name]: value,
        });
    if (name === "username" && value.length >= 3) {
        setErrors((prevState) => ({ ...prevState, username: "" }));
    }

    if (name === "email" && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
        setErrors((prevState) => ({ ...prevState, email: "" }));
    }

    if (name === "githubUsername" && value.length >= 3) {
        setErrors((prevState) => ({ ...prevState, githubUsername: "" }));
    }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form data
        const { error } = schema.validate(formData, { abortEarly: false });
        if (error) {
        const validationErrors = {};
        error.details.forEach((err) => {
            validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
        } else {
        setErrors({});
        // Save data to Local Storage
        localStorage.setItem("formData", JSON.stringify(formData));

        console.log("Form submitted successfully!", formData);
        // alert("Your ticket has been generated!");
        setTimeout(() => {
            setFormData({
            username: "",
            email: "",
            githubUsername: "",
            avatar: "",
            });
        }, 200);
        window.location.reload();
        }
    };

    useEffect(() => {
        const savedData = localStorage.getItem("formData");
        if (savedData) {
        setFormData(JSON.parse(savedData)); // Parse and set data to state
        }
    }, []);

    return (
        <div>
        <section className=" flex justify-center pt-5 pb-14">
            <div className="w-[60%] flex justify-center  text-center">
            <div>
                <form onSubmit={handleSubmit}>
                <label
                    htmlFor="avatar"
                    className="block text-sm mt-4 mb-2 text-start text-white"
                >
                    Upload Avatar :
                </label>
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={handleInputChange}
                    className="ring-1 bg-customPurple w-full rounded-md px-6 py-6 
                        outline-dashed outline-outLineColor outline-1 cursor-pointer
                        text-white "
                />
                {errors.avatar && (
                    <div className="text-red-500 text-sm text-start mt-1 w-fit bg-black ">
                    {errors.avatar}.
                    <i className="fa-solid fa-circle-exclamation text-red-500 ml-2"></i>
                    </div>
                )}

                <label
                    htmlFor="username"
                    className="block text-sm mt-4 mb-2 text-start text-white"
                >
                    Full Name :
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="ring-1 bg-customPurple w-full rounded-md px-4 py-2 
                        outline-dashed outline-outLineColor outline-1 
                        text-white "
                />
                {errors.username && (
                    <p className="text-red-500 text-sm text-start mt-1 w-fit bg-black ">
                    {errors.username}.
                    <i className="fa-solid fa-circle-exclamation text-red-500 ml-2"></i>
                    </p>
                )}

                <label
                    htmlFor="email"
                    className="block text-sm mt-4 mb-2 text-start text-white"
                >
                    Email Address :
                </label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="ring-1 bg-customPurple w-full rounded-md px-4 py-2 
                        outline-dashed outline-outLineColor outline-1 
                        text-white "
                />
                {errors.email && (
                    <p className="text-red-500 text-sm text-start mt-1 w-fit bg-black ">
                    {errors.email}.
                    <i className="fa-solid fa-circle-exclamation text-red-500 ml-2"></i>
                    </p>
                )}

                <label
                    htmlFor="githubUsername"
                    className="block text-sm mt-4 mb-2 text-start text-white"
                >
                    GitHup Username :
                </label>
                <input
                    type="text"
                    name="githubUsername"
                    id="githubUsername"
                    value={formData.githubUsername}
                    onChange={handleInputChange}
                    className="ring-1 bg-customPurple w-full rounded-md px-4 py-2 
                        outline-dashed outline-outLineColor outline-1 
                        text-white "
                />
                {errors.githubUsername && (
                    <p className="text-red-500 text-sm text-start mt-1 w-fit bg-black ">
                    {errors.githubUsername}
                    <i className="fa-solid fa-circle-exclamation text-red-500 ml-2"></i>
                    </p>
                )}

                <button className="font-semibold w-full bg-orange-600 px-4 py-1 hover:text-teal-50 duration-200 rounded-full mt-4">
                    Generate My Ticket
                </button>
                </form>
            </div>
            </div>
        </section>
        </div>
    );
}

export default Home;
