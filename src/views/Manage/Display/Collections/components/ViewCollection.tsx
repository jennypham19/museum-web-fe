import { ICollection } from "@/types/display";
import NavigateBack from "@/views/Manage/components/NavigateBack";

interface ViewCollectionProps{
    data: ICollection;
    onBack: () => void;
}

const ViewCollection = (props: ViewCollectionProps) => {
    const { onBack } = props;
    return(
        <NavigateBack onBack={onBack} title="Chi tiết bộ sưu tập"/>
    )
}

export default ViewCollection;