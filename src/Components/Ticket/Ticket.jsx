    import { useEffect, useState } from "react";
    import { ReactSVG } from "react-svg";

    function Ticket() {
    const [data, setData] = useState([]);
    const [randomNumber, setRandomNumber] = useState("");

    // Fetch data from localStorage
    useEffect(() => {
        const storedData = localStorage.getItem("formData");
        if (storedData) {
        setData(JSON.parse(storedData));
        }
        const random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        setRandomNumber(random);
    }, []);

    const deleting = () => {
        localStorage.removeItem("formData");
        window.location.reload();
        setTimeout(() => {
        setData([]);
        }, 200);
    };
    console.log(data.avatar);

    return (
        <div>
        {data ? (
            <section className="relative">
            <div className="flex justify-center items-center py-5">
                <div className="w-[60%] flex justify-center">
                <div className="lg:w-[60%] w-full relative">
                    <img src="/images/pattern-ticket.svg" />
                    <div className="absolute top-4 left-3">
                    <img
                        src="/images/logo-full.svg"
                        className="lg:w-full md:w-full sm:w-[80%] xs:w-[70%]"
                    />
                    <p className="mt-2 lg:text-sm md:text-sm sm:text-sm xs:text-[.7rem] text-gray-400">
                        Jan 31, 2025 / Austin, TX
                    </p>
                    </div>
                    <div className="absolute bottom-2 left-3 flex">
                    <div className="lg:w-[16%] md:w-[12%] sm:w-[10%] xs:w-[10%]">
                        <img
                        src={data.avatar}
                        alt="avatar"
                        className="w-full h-auto rounded-lg"
                        />
                    </div>

                    <div className="ml-2 text-white text-sm">
                        <p className="">{data.username}</p>
                        <div className="flex pt-1 items-center">
                        <ReactSVG src="/images/icon-github.svg" className="" />
                        <a
                            href={`https://github.com/${data.githubUsername}`}
                            className="text-gray-400 text-[.8rem] pl-1 hover:text-colorLogo duration-300 transition-all"
                            target="_blank"
                        >
                            @{data.githubUsername}
                        </a>
                        </div>
                    </div>
                    </div>
                    <div>
                    <p className="text-gray-300 text-xl tracking-widest absolute top-[50%] translate-y-[-50%] right-0 rotate-90">
                        #{randomNumber}
                    </p>
                    </div>
                </div>
                </div>
            </div>
            <button
                className="btn rounded-full w-52 px-4 py-1 text-white bg-red-500 absolute bottom-[-30px] left-[50%] translate-x-[-50%]"
                onClick={deleting}
            >
                Delete
            </button>
            </section>
        ) : (
            <p className="text-center text-gray-500 mt-10">
            No data found. Please create your ticket first.
            </p>
        )}
        </div>
    );
    }

    export default Ticket;
