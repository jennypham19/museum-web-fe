import { IImageDetailObject } from "@/types/landingpage";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

interface LightboxProps{
    type: string;
    images?: IImageDetailObject[];
    image?: { name: string, url: string };
    open: boolean,
    onClose: () => void;
    index: number
}

const LightboxComponent = (props: LightboxProps) => {
    const { type, image, images, open, onClose, index = 0 } = props;
    return(
        <>
            {type === 'single' && (
                <Lightbox
                    open={open}
                    close={onClose}
                    index={index}
                    slides={[
                        {
                            title: image?.name,
                            src: image?.url ? image?.url : '',
                        }
                    ]}
                    plugins={[Zoom]}
                />
            )}
            {type === 'multiline' && (
                <Lightbox
                    open={open}
                    close={onClose}
                    index={index}
                    slides={images?.map(img => ({
                        src: img.url,
                        title: img.name
                    }))}
                    plugins={[Zoom]}
                />
            )}
        </>
    )
}

export default LightboxComponent;