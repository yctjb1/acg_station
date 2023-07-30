import React from "react";

const SimpleB = () => {
    return (
        <div className="bg-gray-200">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-xl font-bold">My Website</h1>
            </header>
            <div className="container mx-auto p-4 md:flex">
                <div className="md:w-1/3 md:mr-4">
                    <h2 className="text-lg font-bold mb-4">Sidebar</h2>
                    <ul className="list-disc ml-4">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </div>
                <div className="md:w-2/3">
                    <h2 className="text-lg font-bold mb-4">Main Content</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam vel tortor vitae dolor euismod tempus. Donec in
                        mauris euismod, scelerisque elit a, tempor elit. Aliquam
                        tristique posuere nisi ac ultricies. Donec eu dui est.
                        Proin finibus metus eu nisi accumsan, id auctor eros
                        fermentum. Nam suscipit aliquet augue, sed ornare odio
                        aliquam vel. Nulla facilisi. Nulla facilisi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SimpleB;
