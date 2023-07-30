const SimpleCard = ({
    cardTitle = null,
    cardFooter = null,
    children = <></>,
    widthClassName = "w-1/3"
}: {
    cardTitle: null | JSX.Element,
    cardFooter: null | JSX.Element,
    children: React.ReactNode,
    widthClassName?: string,
}) => {
    const Card = ({ children }: any) => (
        <div className="bg-white rounded-lg shadow-md p-4 mt-8">{children}</div>
    );

    const CardTitle = ({ children }: any) => (
        <h2 className="text-lg font-bold mb-2">{children}</h2>
    );

    const CardBody = ({ children }: any) => <div className="mb-2">{children}</div>;

    const CardFooter = ({ children }: any) => (
        <div className="flex justify-end">{children}</div>
    );


    return (
        <div className="flex justify-center">
            <div className={widthClassName}>
                <Card>
                    <CardTitle>{cardTitle}</CardTitle>
                    <CardBody>
                        {children}
                    </CardBody>
                    <CardFooter>
                        {cardFooter}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default SimpleCard;
