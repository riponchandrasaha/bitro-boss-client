


const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className=" mx-auto text-center md:w-4/12 my-7">
            <p className=" text-yellow-500">{subHeading}</p>
            <h3 className=" text-4xl uppercase py-5 bg-center border-y-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;