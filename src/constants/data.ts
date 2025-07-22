import image_collection from "@/assets/images/users/collection_image.png";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PublicIcon from '@mui/icons-material/Public';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import MapIcon from '@mui/icons-material/Map';
import StorefrontIcon from '@mui/icons-material/Storefront';
import live_1 from "@/assets/images/users/1.png";
import live_2 from "@/assets/images/users/2.png";
import live_3 from "@/assets/images/users/3.png";
import image_location from "@/assets/images/users/image_location.png";
import image_exhibition from "@/assets/images/users/image_exhibition.png";
import explore_1 from "@/assets/images/users/explore_1.png";
import explore_2 from "@/assets/images/users/explore_2.png";
import explore_3 from "@/assets/images/users/explore_3.png";
import explore_4 from "@/assets/images/users/explore_4.png";

export const DATA_LIVE_STREAM = [
    {
        id: 1,
        image_url: live_1,
        title: 'Nghệ thuật từ Châu Á',
        date: 'Ngày 26/06',
        status: 'Sắp diễn ra'
    },
    {
        id: 1,
        image_url: live_2,
        title: 'Nghệ thuật cổ điển Châu Mỹ',
        date: 'Ngày 26/06',
        status: 'Sắp diễn ra'
    },
    {
        id: 3,
        image_url: live_3,
        title: 'Trình diễn Tiffany từ Úc',
        date: 'Ngày 26/06',
        status: 'Sắp diễn ra'
    }
];

export const DATA_LOCATION_TIME = [
    {
        id: 1,
        image_url: image_location,
        title: 'Triễn lãm đèn Tiffany',
        date: 'Chủ nhật - Thứ Ba: 10 AM - 17 PM',
        time_open: 'Thứ Sáu - Thứ Bảy: 10 AM - 17 PM',
        time_close: 'Thứ Tư - Thứ Năm',
        reason: 'Đóng cửa trong tuần để sửa chữa lỗi hỏng trong bảo tàng. Mong quý khách thông cảm'
    },
    {
        id: 2,
        image_url: image_location,
        title: 'Triễn lãm đèn Tiffany',
        date: 'Chủ nhật - Thứ Ba: 10 AM - 17 PM',
        time_open: 'Thứ Sáu - Thứ Bảy: 10 AM - 17 PM',
        time_close: 'Thứ Tư - Thứ Năm',
        reason: 'Đóng cửa trong tuần để sửa chữa lỗi hỏng trong bảo tàng. Mong quý khách thông cảm'
    },
]

export const DATA_EXHIBITION = [
    {
        id: 1,
        image_url: image_exhibition,
        title: "Triển lãm ' Ánh dương xanh'",
        content: 'Triển lãm đèn Tiffany mang đến trải nghiệm tinh tế của phong cách Art Nouveau qua các tác phẩm thủy tinh pha chì lấp lánh, do Louis Comfort Tiffany và đặc biệt là Clara Driscoll - "bà hoàng" của nhóm "Tiffany Girls" - kiến tạo',
    },
    {
        id: 2,
        image_url: image_exhibition,
        title: "Triển lãm ' Ánh dương xanh'",
        content: 'Triển lãm đèn Tiffany mang đến trải nghiệm tinh tế của phong cách Art Nouveau qua các tác phẩm thủy tinh pha chì lấp lánh, do Louis Comfort Tiffany và đặc biệt là Clara Driscoll - "bà hoàng" của nhóm "Tiffany Girls" - kiến tạo',
    },
    {
        id: 3,
        image_url: image_exhibition,
        title: "Triển lãm ' Ánh dương xanh'",
        content: 'Triển lãm đèn Tiffany mang đến trải nghiệm tinh tế của phong cách Art Nouveau qua các tác phẩm thủy tinh pha chì lấp lánh, do Louis Comfort Tiffany và đặc biệt là Clara Driscoll - "bà hoàng" của nhóm "Tiffany Girls" - kiến tạo',
    },
    {
        id: 4,
        image_url: image_exhibition,
        title: "Triển lãm ' Ánh dương xanh'",
        content: 'Triển lãm đèn Tiffany mang đến trải nghiệm tinh tế của phong cách Art Nouveau qua các tác phẩm thủy tinh pha chì lấp lánh, do Louis Comfort Tiffany và đặc biệt là Clara Driscoll - "bà hoàng" của nhóm "Tiffany Girls" - kiến tạo',
    },
]

export const DATA_EXPLORE = [
    {
        id: 1,
        image_url: explore_1,
        title: 'Sen Decor Tiffany',
    },
    {
        id: 2,
        image_url: explore_2,
        title: 'Sen Decor Tiffany',
    },
    {
        id: 3,
        image_url: explore_3,
        title: 'Sen Decor Tiffany',
    },
    {
        id: 4,
        image_url: explore_4,
        title: 'Sen Decor Tiffany',
    },
];

export const DATA_LINKS = [
    {
        id: 1,
        name: 'Trang chủ',
        path: '/home'
    },
    {
        id: 2,
        name: 'Triển lãm',
        path: '/exhibition'
    },
    {
        id: 3,
        name: 'Sưu tập',
        path: '/outstanding-collection'
    },
    {
        id: 4,
        name: 'Giới thiệu',
        path: '/introduce-museum'
    },
];

export const DATA_INFO = [
    {
        id: 1,
        name: 'Giới thiệu',
        path: '/introduce-museum'
    },
    {
        id: 2,
        name: 'Liên hệ',
        path: '/contact'
    },
    {
        id: 3,
        name: 'Pages',
        path: '/pages'
    },
];

export const DATA_SOCIAL = [
    {
        id: 1,
        name: 'Facebook',
        path: '#'
    },
    {
        id: 2,
        name: 'Tiktok',
        path: '#'
    },
    {
        id: 3,
        name: 'Website',
        path: '#'
    },
    {
        id: 4,
        name: 'Shop',
        path: '#'
    },
]

export const DATA_SERVICES = [
    {
        id: 1,
        name: 'Phát nhạc nền cho bảo tàng',
        path: '#',
        icon: MusicNoteIcon
    },
    {
        id: 2,
        name: 'Chụp photobooth vintage',
        path: '#',
        icon: PhotoCameraIcon
    },
    {
        id: 3,
        name: 'Khám phá các tác phẩm hot',
        path: '#',
        icon: PublicIcon
    },
    {
        id: 4,
        name: 'Cafe chill cực chill Amuse',
        path: '#',
        icon: LocalCafeIcon
    },
    {
        id: 5,
        name: 'Hành trình tour siêu vui vẻ',
        path: '#',
        icon: MapIcon
    },
    {
        id: 6,
        name: 'Mua sắm tiện lợi từ online',
        path: '#',
        icon: StorefrontIcon
    },
]