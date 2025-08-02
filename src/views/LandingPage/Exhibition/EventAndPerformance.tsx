import { useState } from "react";
import ContentInfoEventAndPerformance from "./ContentInfoEventAndPerformance";
import ContentEventAndPerformance from "./ContentEventAndPerformance";

const ScheduleOfExhibition = () => {
    const [openContent, setOpenContent] = useState(false);

    const handleOpenContent = (id: number) => {
        setOpenContent(true);
    } 

    return (
        <>
            {openContent ? (
                <ContentInfoEventAndPerformance id={1} handBack={() => { setOpenContent(false) }}/>
            ) : (
                <ContentEventAndPerformance handleOpen={handleOpenContent}/>
            )}
        </>
    )
}

export default ScheduleOfExhibition;