import React from "react";

const SimpleC = () => {
    const Card = ({ children }: any) => (
        <div className="bg-white rounded-lg shadow-md p-4">{children}</div>
    );

    const CardTitle = ({ children }: any) => (
        <h2 className="text-lg font-bold mb-2">{children}</h2>
    );

    const CardBody = ({ children }: any) => <div className="mb-2">{children}</div>;

    const CardFooter = ({ children }: any) => (
        <div className="flex justify-end">{children}</div>
    );

    const Button = ({ children }: any) => (
        <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700">
            {children}
        </button>
    );
    return (
        <div className="flex justify-center">
            <div className="w-1/3">
                <Card>
                    <CardTitle>Card Title</CardTitle>
                    <CardBody>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed imperdiet, diam id blandit placerat,
                            sapien sapien rutrum tellus, sed commodo ipsum
                            mauris at tellus.
                        </p>
                    </CardBody>
                    <CardFooter>
                        <Button>Read More</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default SimpleC;
