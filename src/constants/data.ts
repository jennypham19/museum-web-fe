import live_1 from "@/assets/images/users/1.png";
import live_2 from "@/assets/images/users/2.png";
import live_3 from "@/assets/images/users/3.png";
import image_location from "@/assets/images/users/image_location.png";
import image_exhibition from "@/assets/images/users/image_exhibition.png";
import explore_1 from "@/assets/images/users/explore_1.png";
import explore_2 from "@/assets/images/users/explore_2.png";
import explore_3 from "@/assets/images/users/explore_3.png";
import explore_4 from "@/assets/images/users/explore_4.png";
import map from "@/assets/images/users/map.png";
import plan from "@/assets/images/users/plan.png";
import app from "@/assets/images/users/app.png";
import present from "@/assets/images/users/present.png";
import { IICommonLandingPage, IInfoExperience, IObjectArt, IPackageMember, IType } from "@/types/landingpage";
import parking_lot from "@/assets/images/users/parking_lot.png";
import painting from "@/assets/images/users/painting.png";
import explore_museum from "@/assets/images/users/explore_museum.png";
import collection from "@/assets/images/users/collection.png";
import card_member from "@/assets/images/users/card_member.png";
import find_museum from "@/assets/images/users/find_museum.png";
import collection_1 from "@/assets/images/users/collection_1.png";
import collection_2 from "@/assets/images/users/collection_2.png";
import collection_3 from "@/assets/images/users/collection_3.png";
import collection_4 from "@/assets/images/users/collection_4.png";
import card_1 from "@/assets/images/users/card_1.png";
import card_2 from "@/assets/images/users/card_2.png";
import object_1 from "@/assets/images/users/object_1.png";
import object_2 from "@/assets/images/users/object_2.png";
import object_3 from "@/assets/images/users/object_3.png";
import object_4 from "@/assets/images/users/object_4.png";
import object_5 from "@/assets/images/users/object_5.png";
import object_6 from "@/assets/images/users/object_6.png";
import object_7 from "@/assets/images/users/object_7.png";
import object_8 from "@/assets/images/users/object_8.png";
import detail_object_1 from "@/assets/images/users/detail_object_1.png";
import detail_object_2 from "@/assets/images/users/detail_object_2.png";
import detail_object_3 from "@/assets/images/users/detail_object_3.png";
import detail_object_4 from "@/assets/images/users/detail_object_4.png";
import detail_object_5 from "@/assets/images/users/detail_object_5.png";
import detail_object_6 from "@/assets/images/users/detail_object_6.png";
import detail_object_7 from "@/assets/images/users/detail_object_7.png";
import ticket_1 from "@/assets/images/users/ticket_1.png";
import ticket_2 from "@/assets/images/users/ticket_2.png";
import ticket_3 from "@/assets/images/users/ticket_3.png";
import ticket_4 from "@/assets/images/users/image_exhibition.png";
import DateTime from "@/utils/DateTime";
import dayjs from "dayjs";
import image_info_1 from "@/assets/images/users/ticket_1.png";
import image_info_2 from "@/assets/images/users/ticket_2.png";
import image_info_3 from "@/assets/images/users/ticket_3.png";
import image_info_4 from "@/assets/images/users/slide_blue_shine.png";
import image_senior_leaders from "@/assets/images/users/image_senior_leaders.png";
import image_collection from "@/assets/images/users/image_collection.png";
import image_reality_research from "@/assets/images/users/image_reality_research.png";

import image_about_us_1 from "@/assets/images/users/image_about_us_1.png";
import image_about_us_2 from "@/assets/images/users/image_about_us_2.png";
import image_about_us_3 from "@/assets/images/users/image_about_us_3.png";
import image_about_us_4 from "@/assets/images/users/image_about_us_4.png";
import image_about_us_5 from "@/assets/images/users/image_about_us_5.png";
import image_about_us_6 from "@/assets/images/users/image_about_us_6.png";
import image_about_us_7 from "@/assets/images/users/image_about_us_7.png";

import image_policy_1 from "@/assets/images/users/image_policy_1.png";
import image_policy_2 from "@/assets/images/users/image_policy_2.png";
import image_policy_3 from "@/assets/images/users/image_policy_3.png";



export const DATA_LIVE_STREAM = [
    {
        id: 1,
        image_url: live_1,
        title: 'Nghệ thuật từ Châu Á',
        date: 'Ngày 26/06',
        status: 'Sắp diễn ra'
    },
    {
        id: 2,
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

export const DATA_PLAN_VISIT: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: map,
        title: 'Bản đồ bảo tàng',
        content: 'Chương trình đào tạo quản lý nghệ thuật cho bảo tàng: Bạn có thể trở thành chuyên gia quản lý nghệ thuật được hay không? Tham gia cùng chúng tôi nhé!'
    },
    {
        id: 2,
        image_url: plan,
        title: 'Lộ trình thăm quan miễn phí',
        content: 'Truyền phát nội dung bổ ích và trao đổi về các nghệ thuật từ các bạn trẻ đầy nhiệt huyết và đam mê nghệ thuật. Học hỏi những trường phái nghệ thuật thú vị và bổ ích.'
    },
    {
        id: 3,
        image_url: app,
        title: 'Tải app bảo tàng để kết nối',
        content: 'Chương trình đào tạo quản lý nghệ thuật cho bảo tàng: Bạn có thể trở thành chuyên gia quản lý nghệ thuật được hay không? Tham gia cùng chúng tôi nhé!'
    },
    {
        id: 4,
        image_url: present,
        title: 'Thuyết trình bảo tàng',
        content: 'Truyền phát nội dung bổ ích và trao đổi về các nghệ thuật từ các bạn trẻ đầy nhiệt huyết và đam mê nghệ thuật. Học hỏi những trường phái nghệ thuật thú vị và bổ ích.'
    },
]

export const DATA_ABOUT_US: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: card_1,
        title: 'Lịch sử bảo tàng',
        content: 'Chương trình đào tạo quản lý nghệ thuật cho bảo tàng: Bạn có thể trở thành chuyên gia quản lý nghệ thuật được hay không? Tham gia cùng chúng tôi nhé!',
        type: 'history_museum'
    },
    {
        id: 2,
        image_url: image_senior_leaders,
        title: 'Lãnh đạo cao cấp',
        content: 'Truyền phát nội dung bổ ích và trao đổi về các nghệ thuật từ các bạn trẻ đầy nhiệt huyết và đam mê nghệ thuật. Học hỏi những trường phái nghệ thuật thú vị và bổ ích.',
        type: 'senior_leader'
    },
    {
        id: 3,
        image_url: image_collection,
        title: 'Bộ sưu tập',
        content: 'Truyền phát nội dung bổ ích và trao đổi về các nghệ thuật từ các bạn trẻ đầy nhiệt huyết và đam mê nghệ thuật. Học hỏi những trường phái nghệ thuật thú vị và bổ ích.',
        type: 'museum_collection'
    },
    {
        id: 4,
        image_url: image_reality_research,
        title: 'Nghiên cứu thực tại',
        content: 'Chương trình đào tạo quản lý nghệ thuật cho bảo tàng: Bạn có thể trở thành chuyên gia quản lý nghệ thuật được hay không? Tham gia cùng chúng tôi nhé!',
        type: 'reality_research'
    },
]

export const DATA_COMMON: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: parking_lot,
        title: 'Địa điểm gửi xe',
        content: 'Khám phá Bảo tàng cùng gia đình với hướng dẫn viên đặc biệt, sự kiện và nhiều hơn thế nữa.'
    },
    {
        id: 2,
        image_url: painting,
        title: 'Tác phẩm nổi bật',
        content: 'Truyền phát nội dung Hướng dẫn bằng âm thanh cho hàng ngàn tác phẩm nghệ thuật trong các phòng trưng bày và một số triển lãm hiện tại.'
    },
    {
        id: 3,
        image_url: explore_museum,
        title: 'Khám phá bảo tàng',
        content: 'Truyền tải nội dung bằng AV thực tế ảo hình ảnh và âm thanh sống động, chân thực tạo cảm giác cho người xem ở không gian thực.'
    },
    {
        id: 4,
        image_url: collection,
        title: 'Bộ sưu tập tác phẩm',
        content: 'Khám phá Bảo tàng cùng gia đình với hướng dẫn viên đặc biệt, sự kiện và nhiều hơn thế nữa.'
    },
    {
        id: 5,
        image_url: card_member,
        title: 'Thẻ thành viên',
        content: 'Truyền phát nội dung Hướng dẫn bằng âm thanh cho hàng ngàn tác phẩm nghệ thuật trong các phòng trưng bày và một số triển lãm hiện tại.'
    },
    {
        id: 6,
        image_url: find_museum,
        title: 'Tìm hiểu về bảo tàng',
        content: 'Truyền tải nội dung bằng AV thực tế ảo hình ảnh và âm thanh sống động, chân thực tạo cảm giác cho người xem ở không gian thực.'
    },
];

export const DATA_COLLECTION: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: collection_1,
        title: 'Tranh kính ảo diệu',
        content: 'Bộ sưu tập nhà Sen khi kết hợp các mảnh kính đầy màu sắc quy tụ với nhau tạo nên một bức tranh kính hoàn hảo độc đáo, từng mảnh ghép tinh tế kết hợp nên bộ sưu tập đầy màu sắc này.'
    },
    {
        id: 2,
        image_url: collection_2,
        title: 'Đèn kính đứng Tiffany',
        content: 'Truyền phát nội dung bổ ích và trao đổi về các nghệ thuật từ các bạn trẻ đầy nhiệt huyết và đam mê nghệ thuật. Học hỏi những trường phái nghệ thuật thú vị và bổ ích.'
    },
    {
        id: 3,
        image_url: collection_3,
        title: 'Đèn kính treo tường Tiffany',
        content: 'Chương trình đào tạo quản lý nghệ thuật cho bảo tàng: Bạn có thể trở thành chuyên gia quản lý nghệ thuật được hay không? Tham gia cùng chúng tôi nhé!'
    },
    {
        id: 4,
        image_url: collection_4,
        title: 'Đèn cây đứng Tiffany',
        content: 'Truyền phát nội dung bổ ích và trao đổi về các nghệ thuật từ các bạn trẻ đầy nhiệt huyết và đam mê nghệ thuật. Học hỏi những trường phái nghệ thuật thú vị và bổ ích.'
    },
]

export const DATA_ABOUT_MUSEUM = [
    {
        id: 1,
        title: "Hướng dẫn cho khách tham quan",
        label: 'Xem lại hướng dẫn dành cho du khách để có trải nghiệm tuyệt vời tại bảo tàng',
        url: '/visit-plan/direct-for-visiter'
    },
    {
        id: 2,
        title: "Hướng dẫn bãi đỗ xe",
        label: 'Lên kế hoạch cho lộ trình đến bảo tàng',
        url: '/visit-plan/direct-parking-lot'
    },
    {
        id: 3,
        title: "Bản đồ bảo tàng",
        label: 'Sử dụng bản đồ tương tác của website để tham quan bảo tàng',
        url: '/map-museum'
    },
    {
        id: 4,
        title: "Trở thành thành viên của bảo tàng",
        label: 'Tận hưởng quyền lợi ưu đãi khi mua vé vào cửa và các thông báo triển lãm sớm nhất',
        url: '/card-member'
    },
]

export const DATA_LIST_CLOSED_LOCATION = [
    {
        id: 1,
        title: 'Khu triển lãm "Hoa hướng dương"',
        label: 'Hiện có 128 tác phẩm đang trong quá trình sửa chữa'
    },
    {
        id: 2,
        title: 'Triển lãm siêu thực',
        label: 'Đã hết thời gian triển lãm'
    },
    {
        id: 3,
        title: 'Chương trình kết nạp thành viên',
        label: 'Đã hết thời gian triển lãm'
    },
    {
        id: 4,
        title: 'Tòa lâu đài thác đèn Tiffany',
        label: 'Dự kiến mở cửa vào 23-08-2025'
    },
    {
        id: 5,
        title: 'Nghệ thuật thực tế ảo',
        label: 'Trải nghiệm miễn phí đã hết hạn'
    },
    {
        id: 6,
        title: 'Nghệ thuật từ Pháp',
        label: 'Chuẩn bị mở cửa vào 15-07-2025'
    },   
]

export const DATA_DIRECT_VISTITOR = [
    {
        id: 1,
        title: 'Tôi có thể mang theo những gì?',
        content: 'Được phép mang theo ba nhỏ nhưng phải đeo phía trước ngực hoặc xách trên tay.\n' +
        'Nước được phép đựng trong chai an toàn. Không được phép mang theo bất kỳ chất lỏng nào khác.\n' +
        'Xe đẩy và địu em bé hướng về phía trước được chào đón. Xin lưu ý rằng một số triển lãm không cho phép xe đẩy. Xe đẩy chạy bộ và xe đẩy trẻ em không được phép.\n' + 
        'Xe lăn điện được phép lưu thông. \n' + 
        'Chó nghiệp vụ được chào đón.',
    },
    {
        id: 2,
        title: 'Tôi nên để lại những gì?',
        label: 'Những vật dụng sau đây không được phép mang vào tòa nhà hoặc khi gửi áo khoác: ',
        content: 'Túi lớn, hành lý, nhạc cụ, đồ điện tử và thiết bị máy ảnh quá khổ \n' +
        'Các vật chứa bằng thủy tinh, lọ, bình xịt và các chất lỏng khác ngoài nước \n' +
        'Bất kỳ vật thể lớn nào, chẳng hạn như cờ, biểu ngữ, khung, tác phẩm nghệ thuật, xe đẩy mua sắm, đồ dùng thể thao và thiết bị giải trí \n' +
        'Vật liệu đánh dấu, sơn, chất kết dính, epoxy hoặc keo dán (được phép sử dụng bút chì) \n' +
        'Vật nuôi hoặc động vật hỗ trợ tinh thần \n' +
        'Xe đẩy quá khổ, xe đẩy chạy bộ, xe đẩy, xe đạp, ván trượt, giày trượt patin, giày trượt patin, giày trượt băng, mũ bảo hiểm và xe tay ga \n' +
        'Gậy tự sướng, chân máy, chân máy đơn, máy bay không người lái và thiết bị quay video chuyên nghiệp, trừ khi đã được Phòng Truyền thông sắp xếp và chấp thuận trước. \n' +
        'Cây và hoa \n' +
        'Dao thủ công/tiện ích, dụng cụ, tua vít \n' +
        'Trang phục, bao gồm cả mặt nạ che kín toàn bộ khuôn mặt \n' +
        'Bất kỳ vật dụng nào khác có thể gây nguy hiểm cho tác phẩm nghệ thuật hoặc du khách sẽ do nhóm an ninh Met quyết định.'
    },
    {
        id: 3,
        title: 'Tôi có thể chụp ảnh quay phim không?',
        content: 'Hầu hết các phòng trưng bày đều cho phép chụp ảnh và quay video không dùng đèn flash để sử dụng cá nhân, trừ khi có quy định khác. \n' +
        'Việc quay phim các chuyến tham quan có hướng dẫn viên sẽ tùy thuộc vào quyết định của từng hướng dẫn viên. \n' + 
        'Không được phép chụp ảnh trái phép và chụp ảnh dàn dựng (chụp ảnh/quay phim, chụp ảnh người mẫu, chụp ảnh đính hôn). \n' +
        'Các bức ảnh và video được chụp tại The Met không được phép xuất bản, bán, sao chép, chuyển nhượng, phân phối hoặc khai thác thương mại theo bất kỳ cách nào. \n' +
        'Bảo tàng có toàn quyền quyết định từ chối và/hoặc thu hồi quyền chụp ảnh tại khuôn viên của bảo tàng hoặc sao chép ảnh các hiện vật trong bộ sưu tập của bảo tàng.'
    },
    {
        id: 4,
        title: 'Tôi nên biết những gì trước khi vào tòa nhà?',
        content: 'Vui lòng giữ lại vé của bạn. Bạn có thể được yêu cầu xác nhận lại vé khi ra vào phòng trưng bày. Vé vào cửa chỉ được đảm bảo vào ngày in trên vé của bạn. \n' +
        'Vì sự an toàn của mọi người, tất cả du khách và thành viên phải qua kiểm tra an ninh. Vui lòng lên kế hoạch xếp hàng ở lối vào. \n' +
        'Trẻ em từ mười hai tuổi trở xuống phải luôn có người lớn đi kèm. \n' +
        'Không được hoàn lại tiền, bán lại, trao đổi hoặc chuyển nhượng vé Bảo tàng hoặc quyền lợi Thành viên. \n' +
        'Du khách đến The Met có thể được chụp ảnh, quay video hoặc ghi âm theo cách khác. Bằng cách đến thăm, du khách cấp cho Bảo tàng quyền sử dụng ảnh chụp và/hoặc bản ghi âm nghe nhìn có du khách xuất hiện để lưu trữ, làm tư liệu, công khai, quảng cáo hoặc các mục đích khác. \n'
    },
    {
        id: 5,
        title: 'Làm sao tôi có thể đảm bảo trải nghiệm an toàn cho mọi người?',
        content: 'Chúng tôi không chấp nhận những phát ngôn hoặc hành vi lăng mạ, quấy rối, phân biệt đối xử hoặc đe dọa đối với nhân viên hoặc những du khách khác. \n' +
        'Các nguyên tắc về đa dạng, hòa nhập và tiếp cận bình đẳng áp dụng cho mọi khía cạnh hoạt động của bảo tàng, trên mọi loại cá nhân. \n' +
        'Những hành vi gây nguy hiểm cho du khách khác, nhân viên Bảo tàng hoặc bộ sưu tập của Bảo tàng, chẳng hạn như chạy nhảy, chơi đùa thô bạo và hành vi gây rối đều bị nghiêm cấm. \n' +
        'Du khách không được phép phát tờ rơi, thu thập chữ ký, biểu tình, bán hàng hóa và họp báo. \n' +
        'Không được phép chào mời kinh doanh và hoạt động vì lợi nhuận trái phép. \n' +
        'Việc phát nhạc và video trái phép, biểu diễn trái phép, khuếch đại âm thanh và tạo tiếng ồn (trừ các thiết bị hỗ trợ nghe) đều bị nghiêm cấm. \n' +
        'Đảm bảo lối ra vào, cầu thang và hành lang luôn dễ tiếp cận cho du khách khác; không ngồi trên sàn. \n' +
        'Không được bế trẻ em hoặc khách khác trên vai. \n' +
        'Hút thuốc, bao gồm cả thuốc lá điện tử, đều bị nghiêm cấm trong Bảo tàng hoặc gần lối vào. \n' +
        'Cấm sử dụng ổ cắm điện trong Bảo tàng. \n' +
        'Vì lý do sức khỏe và an toàn, bạn phải mặc áo sơ mi và giày. \n'
    },
    {
        id: 6,
        title: 'Tôi có thể bảo vệ các tác phẩm nghệ thuật bằng cách nào?',
        content: 'Vui lòng không chạm vào tác phẩm nghệ thuật, khung, bệ đỡ, nhãn, tủ trưng bày hoặc bất kỳ thứ gì dùng để bảo vệ tác phẩm nghệ thuật.'
    },
    {
        id: 7,
        title: 'Tôi có thể vẽ/ phác thảo tác phẩm không?',
        content: 'Có! Bạn có thể thoải mái viết, vẽ hoặc ghi chú bằng bút chì trên giấy. Không được phép sử dụng các vật liệu đánh dấu khác như sơn, than và bút dạ lên các tác phẩm hoặc tưởng của tòa nhà.'
    }
]

export const DATA_PACKAGE_MEMBER: IPackageMember[] = [
    {
        id: 1,
        title: 'Gói hạng Đồng',
        price: '2.844.000/ năm',
        members: 1,
        guests: 1,
        includes: '1 thẻ thành viên + 1 thẻ khách',
        benefits: 'Sự kiện có vé dành riêng cho thành viên \n' + 
        'Quyền ưu tiên vào hàng đợi triển lãm \n' +
        'Giảm giá 15% tại bảo tàng, cộng thêm giảm 10% cho dịch vụ gửi xe \n' +
        'Buổi ra mắt triển lãm được thông báo \n' +
        'Bản tin điện tử hằng tháng được cập nhật' 
    },
    {
        id: 2,
        title: 'Gói hạng Bạc',
        price: '3.200.000/ năm',
        members: 2,
        guests: 2,
        includes: '2 thẻ thành viên + 2 thẻ khách',
        benefits: 'Tất cả các quyền lợi của hạng Đồng \n' +
        'Đăng kí tham gia gửi tác phẩm vào triển lãm' +
        'Được in ấn về bản tin' 
    },
    {
        id: 3,
        title: 'Gói hạng Vàng',
        price: '3.832.000/ năm',
        members: 2,
        guests: 2,
        includes: '2 thẻ thành viên + 2 thẻ khách',
        benefits: 'Tất cả quyền lợi của hạng Bạc \n' + 
        'Buổi sáng cùng các thành viên bảo tàng \n' +
        'Triển lãm hè cùng các nghệ thuật gia nổi tiếng \n' +
        'Được ấn dấu công nhận thành viên bảo tàng \n' +
        'Hướng dẫn hoạt động theo nhóm đông người'
    },
    {
        id: 4,
        title: 'Gói hạng Bạch Kim',
        price: '4.248.000/ năm',
        members: 1,
        guests: 1,
        includes: '1 thẻ thành viên + 1 thẻ khách',
        benefits: 'Tất cả quyền lợi của hạng Vàng \n'+
        'Được gặp mặt mỗi họp báo hàng tuần cùng nghệ thuật gia \n'+
        'Miễn phí gửi xe và 50% đồ ăn uống tại quầy'
    },
    {
        id: 5,
        title: 'Gói hạng Kim Cương',
        price: '4.844.000/ năm',
        members: 2,
        guests: 4,
        includes: '2 thẻ thành viên + 4 thẻ khách',
        benefits: 'Tất cả quyền lợi cho hạng Bạch Kim \n' +
        'Tham gia phỏng vấn nếu tác phẩm đạt được độ yêu thích \n'+
        'Đăng kí tham gia làm nhà cổ đông của bảo tàng nghệ thuật \n'+
        'Ra vào bảo tàng khi đã quá giờ mở cửa'
    },
    {
        id: 6,
        title: 'Gói hạng Titan',
        price: '5.200.000/ năm',
        members: 1,
        guests: 1,
        includes: '1 thẻ thành viên + 1 thẻ khách',
        benefits: 'Tất cả quyền lợi của hạng Kim Cương \n'+
        'Tham gia vào kế hoạch triển lãm của bảo tàng \n'+
        'Cơ hội làm việc với các bảo tàng khác trên toàn quốc \n'+
        'Cơ hội tham gia vào các triển lãm lớn ở nước ngoài'
    }
]

export const DATA_MEMBER: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: card_1,
        title: 'Chương trình đào tạo quản lý',
        content: 'Chương trình đào tạo quản lý nghệ thuật cho bảo tàng: Bạn có thể trở thành chuyên gia quản lý nghệ thuật được hay không? Tham gia cùng chúng tôi nhé!'
    },
    {
        id: 2,
        image_url: card_2,
        title: 'Chương trình họp các hội viên',
        content: 'Truyền phát nội dung bổ ích và trao đổi về các nghệ thuật từ các bạn trẻ đầy nhiệt huyết và đam mê nghệ thuật. Học hỏi những trường phái nghệ thuật thú vị và bổ ích.'
    },
]

export const DATA_OVERALL = 
    'Phòng trưng bày Nghệ thuật Châu Phi của Met đã trở lại vào tháng 5 năm 2025, trong một Cánh Michael C. Rockefeller được tái thiết . Sau nhiều năm cải tạo, công trình lắp đặt được tái thiết này giới thiệu lại cho du khách bộ sưu tập nghệ thuật Châu Phi cận Sahara của Bảo tàng thông qua tuyển tập khoảng 500 tác phẩm được sắp xếp để khảo sát các phong trào nghệ thuật lớn và truyền thống sống động từ khắp tiểu lục địa. Các phòng trưng bày mới giới thiệu những sáng tạo gốc từ thời Trung cổ đến nay và một phần tư các tác phẩm được trưng bày tại Bảo tàng lần đầu tiên. \n' +
    'Cài đặt cố định mới này nêu bật sự sáng tạo của các nghệ sĩ trên khắp tiểu lục địa và các truyền thống lịch sử năng động, bền bỉ. Một điểm nhấn chính trong các phòng trưng bày được thiết kế lại là về quyền tác giả và tiểu sử được nêu trong các nhãn đi kèm với các sáng tạo của khoảng 40 bậc thầy được công nhận của các nghệ sĩ cá nhân, từ Ọlọ́wẹ̀ của Ìsẹ̀ (khoảng 1873–1938, Efon-Alaaye, Nigeria) đến Abdoulaye Konaté (sinh năm 1953, Diré, Mali). Nghệ thuật được trưng bày bao gồm các tác phẩm từ Mali đến Madagascar, được tạo ra từ thế kỷ XII đến nay, trong nhiều phương tiện khác nhau, từ điêu khắc gỗ và dệt may đến nhiếp ảnh. \n' +
    'Các tác phẩm được bảo tồn và trưng bày tại The Met là những yếu tố của vô số cảnh quan văn hóa nở rộ ở phía nam sa mạc Sahara. Trong số những địa điểm sáng tạo ban đầu đó có những trung tâm thương mại toàn cầu, các triều đình giàu có của các quốc vương Tây và Trung Phi hùng mạnh, và các khu định cư rừng nhiệt đới xích đạo tạm thời. Các nghệ sĩ và xưởng của họ đã khéo léo dịch và khuếch đại một loạt các thế giới quan đặc biệt thành các hiện vật làm tăng cường trải nghiệm sống hàng ngày thoáng qua hoặc các sự kiện hoành tráng và hoành tráng do các vũ công và nhạc sĩ làm sinh động. Một số liên quan đến các hoạt động địa phương đang diễn ra; những hoạt động khác đã được hồi sinh ở châu Mỹ sau các cuộc di cư dân số đang diễn ra bắt đầu từ thế kỷ XVII. Ngay cả khi hoàn toàn tách biệt khỏi các bối cảnh văn hóa đó, nhiều tác phẩm sáng tạo táo bạo này, kể từ thế kỷ XX, đã trở thành chất xúc tác cho những nhà đổi mới lấy cảm hứng từ tính độc đáo và sức mạnh thị giác hấp dẫn của chúng để thực hiện những bước nhảy vọt mới. \n' +
    'Được cải tạo về mặt vật lý bởi Kulapat Yantrasast của WHY Architecture và Beyer, Blinder, Belle Architects LLP, hợp tác với Phòng thiết kế của Bảo tàng Met, các phòng trưng bày được thiết kế lại này neo giữ bộ sưu tập đặc biệt này trong ngôn ngữ kiến ​​trúc khu vực và tôn vinh các địa danh văn hóa đặc biệt của Châu Phi đồng thời làm nổi bật mối liên hệ với các truyền thống lớn khác trên thế giới. \n' +
    'Quan trọng đối với nỗ lực đầy tham vọng này, nhóm giám tuyển của Met đã được hưởng lợi từ chuyên môn quốc gia và quốc tế trong suốt quá trình phát triển, lập kế hoạch và thực hiện dự án vốn này. Việc tái thiết dựa trên nghiên cứu đương đại và trao đổi với mạng lưới các chuyên gia quốc tế có trụ sở tại Hoa Kỳ và trên khắp Châu Phi cận Sahara—từ các nhà sử học đến tiểu thuyết gia đến nhạc sĩ, nhiều người trong số họ được giới thiệu trong chuyến tham quan hướng dẫn bằng âm thanh mới. \n' +
    'Một thành phần chính của bối cảnh hóa mở rộng là sáng kiến ​​kỹ thuật số giới thiệu các địa danh văn hóa đặc sắc của Châu Phi và được thực hiện thông qua quan hệ đối tác với Quỹ Di tích Thế giới (WMF). Cùng nhau, The Met và WMF đã cùng nhau lựa chọn các địa điểm trên khắp Châu Phi cận Sahara trải dài từ thời cổ đại đến thế kỷ XX—một số trong số đó hiện không thể tiếp cận được với hầu hết du khách—vì ý nghĩa văn hóa và lịch sử của chúng. Những địa danh này được giới thiệu trong một loạt mười hai phim ngắn được sản xuất với Sosena Solomon hợp tác với các nhóm giám tuyển và kỹ thuật số của The Met và hợp tác với các chuyên gia văn hóa tại Ghana, Liberia, Nigeria, Ethiopia, Madagascar, Tanzania, Zimbabwe, Nam Phi, Cộng hòa Benin, Botswana, Uganda và Togo, và có thể truy cập thông qua lời nhắc trong phòng trưng bày hoặc thông qua hướng dẫn triển lãm trực tuyến.'

export const DATA_OBJECT_ART: IObjectArt[] = [
    {
        id: 1,
        image_url: object_1,
        title: "Tranh kính bạch tước",
        artist: 'Trương Cao Hoàng',
        time: 'Thế kỉ XX',
        content: '“Autumn Landscape” (1923–24) là một kiệt tác kính màu Favrile do Agnes F. Northrop thiết kế dưới thời Tiffany Studios, hiện trưng bày tại bảo tàng. \n' +
        'Tác phẩm rộng 132 × 102 inch, hình vòm neo‑Gothic vốn được đặt cho cầu thang biệt thự Loren D. Towle ở Boston, nhưng chưa được lắp dựng trước khi Towle qua đời. \n' +
        'Bức tranh khắc họa ánh hoàng hôn chiếu xuyên qua làn lá thu rực rỡ, phản ánh vẻ đẹp tự nhiên không qua phác họa bằng sơn, mà hoàn toàn tạo từ thủ pháp kính đa kỹ thuật.',
        images:[
            { id: 1, name: 'detail_object_1', image_detail_url: detail_object_1 },
            { id: 2, name: 'detail_object_2', image_detail_url: detail_object_2 },
            { id: 3, name: 'detail_object_3', image_detail_url: detail_object_3 },
            { id: 4, name: 'detail_object_4', image_detail_url: detail_object_4 },
            { id: 5, name: 'detail_object_5', image_detail_url: detail_object_5 },
            { id: 6, name: 'detail_object_6', image_detail_url: detail_object_6 },
            { id: 7, name: 'detail_object_7', image_detail_url: detail_object_7 },
        ]
    },
    {
        id: 2,
        image_url: object_2,
        title: "Tranh kính hoa sen",
        artist: 'Trương Cao Hoàng',
        time: 'Thế kỉ XX',
        content: '“Autumn Landscape” (1923–24) là một kiệt tác kính màu Favrile do Agnes F. Northrop thiết kế dưới thời Tiffany Studios, hiện trưng bày tại bảo tàng. \n' +
        'Tác phẩm rộng 132 × 102 inch, hình vòm neo‑Gothic vốn được đặt cho cầu thang biệt thự Loren D. Towle ở Boston, nhưng chưa được lắp dựng trước khi Towle qua đời. \n' +
        'Bức tranh khắc họa ánh hoàng hôn chiếu xuyên qua làn lá thu rực rỡ, phản ánh vẻ đẹp tự nhiên không qua phác họa bằng sơn, mà hoàn toàn tạo từ thủ pháp kính đa kỹ thuật.',
        images:[
            { id: 1, name: 'detail_object_1', image_detail_url: detail_object_1 },
            { id: 2, name: 'detail_object_2', image_detail_url: detail_object_2 },
            { id: 3, name: 'detail_object_3', image_detail_url: detail_object_3 },
            { id: 4, name: 'detail_object_4', image_detail_url: detail_object_4 },
            { id: 5, name: 'detail_object_5', image_detail_url: detail_object_5 },
            { id: 6, name: 'detail_object_6', image_detail_url: detail_object_6 },
            { id: 7, name: 'detail_object_7', image_detail_url: detail_object_7 },
        ]
    },
    {
        id: 3,
        image_url: object_3,
        title: "Landscape Greek Temple",
        artist: 'Louis Comfort Tiffany',
        time: '1900',
        content: '“Autumn Landscape” (1923–24) là một kiệt tác kính màu Favrile do Agnes F. Northrop thiết kế dưới thời Tiffany Studios, hiện trưng bày tại bảo tàng. \n' +
        'Tác phẩm rộng 132 × 102 inch, hình vòm neo‑Gothic vốn được đặt cho cầu thang biệt thự Loren D. Towle ở Boston, nhưng chưa được lắp dựng trước khi Towle qua đời. \n' +
        'Bức tranh khắc họa ánh hoàng hôn chiếu xuyên qua làn lá thu rực rỡ, phản ánh vẻ đẹp tự nhiên không qua phác họa bằng sơn, mà hoàn toàn tạo từ thủ pháp kính đa kỹ thuật.',
        images:[
            { id: 1, name: 'detail_object_1', image_detail_url: detail_object_1 },
            { id: 2, name: 'detail_object_2', image_detail_url: detail_object_2 },
            { id: 3, name: 'detail_object_3', image_detail_url: detail_object_3 },
            { id: 4, name: 'detail_object_4', image_detail_url: detail_object_4 },
            { id: 5, name: 'detail_object_5', image_detail_url: detail_object_5 },
            { id: 6, name: 'detail_object_6', image_detail_url: detail_object_6 },
            { id: 7, name: 'detail_object_7', image_detail_url: detail_object_7 },
        ]
    },
    {
        id: 4,
        image_url: object_4,
        title: "Autumn Landscape",
        artist: 'Northrop',
        time: '1923',
        content: '“Autumn Landscape” (1923–24) là một kiệt tác kính màu Favrile do Agnes F. Northrop thiết kế dưới thời Tiffany Studios, hiện trưng bày tại bảo tàng. \n' +
        'Tác phẩm rộng 132 × 102 inch, hình vòm neo‑Gothic vốn được đặt cho cầu thang biệt thự Loren D. Towle ở Boston, nhưng chưa được lắp dựng trước khi Towle qua đời. \n' +
        'Bức tranh khắc họa ánh hoàng hôn chiếu xuyên qua làn lá thu rực rỡ, phản ánh vẻ đẹp tự nhiên không qua phác họa bằng sơn, mà hoàn toàn tạo từ thủ pháp kính đa kỹ thuật.',
        images:[
            { id: 1, name: 'detail_object_1', image_detail_url: detail_object_1 },
            { id: 2, name: 'detail_object_2', image_detail_url: detail_object_2 },
            { id: 3, name: 'detail_object_3', image_detail_url: detail_object_3 },
            { id: 4, name: 'detail_object_4', image_detail_url: detail_object_4 },
            { id: 5, name: 'detail_object_5', image_detail_url: detail_object_5 },
            { id: 6, name: 'detail_object_6', image_detail_url: detail_object_6 },
            { id: 7, name: 'detail_object_7', image_detail_url: detail_object_7 },
        ]
    },
    {
        id: 5,
        image_url: object_5,
        title: "Window",
        artist: 'Louis Comfort Tiffany',
        time: '1890',
        content: '“Autumn Landscape” (1923–24) là một kiệt tác kính màu Favrile do Agnes F. Northrop thiết kế dưới thời Tiffany Studios, hiện trưng bày tại bảo tàng. \n' +
        'Tác phẩm rộng 132 × 102 inch, hình vòm neo‑Gothic vốn được đặt cho cầu thang biệt thự Loren D. Towle ở Boston, nhưng chưa được lắp dựng trước khi Towle qua đời. \n' +
        'Bức tranh khắc họa ánh hoàng hôn chiếu xuyên qua làn lá thu rực rỡ, phản ánh vẻ đẹp tự nhiên không qua phác họa bằng sơn, mà hoàn toàn tạo từ thủ pháp kính đa kỹ thuật.',
        images:[
            { id: 1, name: 'detail_object_1', image_detail_url: detail_object_1 },
            { id: 2, name: 'detail_object_2', image_detail_url: detail_object_2 },
            { id: 3, name: 'detail_object_3', image_detail_url: detail_object_3 },
            { id: 4, name: 'detail_object_4', image_detail_url: detail_object_4 },
            { id: 5, name: 'detail_object_5', image_detail_url: detail_object_5 },
            { id: 6, name: 'detail_object_6', image_detail_url: detail_object_6 },
            { id: 7, name: 'detail_object_7', image_detail_url: detail_object_7 },
        ]
    },
    {
        id: 6,
        image_url: object_6,
        title: "Đèn Tiffany Magnolia",
        artist: 'Louis Comfort Tiffany',
        time: '1848 - 1933',
        content: '“Autumn Landscape” (1923–24) là một kiệt tác kính màu Favrile do Agnes F. Northrop thiết kế dưới thời Tiffany Studios, hiện trưng bày tại bảo tàng. \n' +
        'Tác phẩm rộng 132 × 102 inch, hình vòm neo‑Gothic vốn được đặt cho cầu thang biệt thự Loren D. Towle ở Boston, nhưng chưa được lắp dựng trước khi Towle qua đời. \n' +
        'Bức tranh khắc họa ánh hoàng hôn chiếu xuyên qua làn lá thu rực rỡ, phản ánh vẻ đẹp tự nhiên không qua phác họa bằng sơn, mà hoàn toàn tạo từ thủ pháp kính đa kỹ thuật.',
        images:[
            { id: 1, name: 'detail_object_1', image_detail_url: detail_object_1 },
            { id: 2, name: 'detail_object_2', image_detail_url: detail_object_2 },
            { id: 3, name: 'detail_object_3', image_detail_url: detail_object_3 },
            { id: 4, name: 'detail_object_4', image_detail_url: detail_object_4 },
            { id: 5, name: 'detail_object_5', image_detail_url: detail_object_5 },
            { id: 6, name: 'detail_object_6', image_detail_url: detail_object_6 },
            { id: 7, name: 'detail_object_7', image_detail_url: detail_object_7 },
        ]
    },
    {
        id: 7,
        image_url: object_7,
        title: "Đèn Tiffany Lotus Bell",
        artist: 'Louis Comfort Tiffany',
        time: '1848 - 1933',
        content: '“Autumn Landscape” (1923–24) là một kiệt tác kính màu Favrile do Agnes F. Northrop thiết kế dưới thời Tiffany Studios, hiện trưng bày tại bảo tàng. \n' +
        'Tác phẩm rộng 132 × 102 inch, hình vòm neo‑Gothic vốn được đặt cho cầu thang biệt thự Loren D. Towle ở Boston, nhưng chưa được lắp dựng trước khi Towle qua đời. \n' +
        'Bức tranh khắc họa ánh hoàng hôn chiếu xuyên qua làn lá thu rực rỡ, phản ánh vẻ đẹp tự nhiên không qua phác họa bằng sơn, mà hoàn toàn tạo từ thủ pháp kính đa kỹ thuật.',
        images:[
            { id: 1, name: 'detail_object_1', image_detail_url: detail_object_1 },
            { id: 2, name: 'detail_object_2', image_detail_url: detail_object_2 },
            { id: 3, name: 'detail_object_3', image_detail_url: detail_object_3 },
            { id: 4, name: 'detail_object_4', image_detail_url: detail_object_4 },
            { id: 5, name: 'detail_object_5', image_detail_url: detail_object_5 },
            { id: 6, name: 'detail_object_6', image_detail_url: detail_object_6 },
            { id: 7, name: 'detail_object_7', image_detail_url: detail_object_7 },
        ]
    },
    {
        id: 8,
        image_url: object_8,
        title: "Đèn Tiffany Peony",
        artist: 'Louis Comfort Tiffany',
        time: '1848 - 1933',
        content: '“Autumn Landscape” (1923–24) là một kiệt tác kính màu Favrile do Agnes F. Northrop thiết kế dưới thời Tiffany Studios, hiện trưng bày tại bảo tàng. \n' +
        'Tác phẩm rộng 132 × 102 inch, hình vòm neo‑Gothic vốn được đặt cho cầu thang biệt thự Loren D. Towle ở Boston, nhưng chưa được lắp dựng trước khi Towle qua đời. \n' +
        'Bức tranh khắc họa ánh hoàng hôn chiếu xuyên qua làn lá thu rực rỡ, phản ánh vẻ đẹp tự nhiên không qua phác họa bằng sơn, mà hoàn toàn tạo từ thủ pháp kính đa kỹ thuật.',
        images:[
            { id: 1, name: 'detail_object_1', image_detail_url: detail_object_1 },
            { id: 2, name: 'detail_object_2', image_detail_url: detail_object_2 },
            { id: 3, name: 'detail_object_3', image_detail_url: detail_object_3 },
            { id: 4, name: 'detail_object_4', image_detail_url: detail_object_4 },
            { id: 5, name: 'detail_object_5', image_detail_url: detail_object_5 },
            { id: 6, name: 'detail_object_6', image_detail_url: detail_object_6 },
            { id: 7, name: 'detail_object_7', image_detail_url: detail_object_7 },
        ]
    },
]
export const DATA_TICKET_LOCATION = [
    {
        id: 1,
        image_url: ticket_1,
        title: 'Triển lãm "Ánh dương xanh"',
        open: 'Giờ mở cửa: thứ hai - thứ tư \n' + 
        'Giờ mở cửa: thứ năm \n' +
        'Giờ mở cửa: thứ sáu - chủ nhật',
        hour: '14 PM - 20 PM \n' +
        '08 AM - 16 PM \n' +
        '10 AM - 17 PM'
    },
    {
        id: 2,
        image_url: ticket_2,
        title: 'Chương trình khai trương',
        open: 'Giờ mở cửa: thứ hai - thứ tư \n' + 
        'Giờ mở cửa: thứ năm \n' +
        'Giờ mở cửa: thứ sáu - chủ nhật',
        hour: '14 PM - 20 PM \n' +
        '08 AM - 16 PM \n' +
        '10 AM - 17 PM'
    },
    {
        id: 3,
        image_url: ticket_3,
        title: 'Tiffany và các tác phẩm',
        open: 'Giờ mở cửa: thứ hai - thứ tư \n' + 
        'Giờ mở cửa: thứ năm \n' +
        'Giờ mở cửa: thứ sáu - chủ nhật',
        hour: '14 PM - 20 PM \n' +
        '08 AM - 16 PM \n' +
        '10 AM - 17 PM'
    },
    {
        id: 4,
        image_url: ticket_4,
        title: 'Khu triển lãm nghệ thuật',
        open: 'Giờ mở cửa: thứ hai - thứ tư \n' + 
        'Giờ mở cửa: thứ năm \n' +
        'Giờ mở cửa: thứ sáu - chủ nhật',
        hour: '14 PM - 20 PM \n' +
        '08 AM - 16 PM \n' +
        '10 AM - 17 PM'
    },
]

export const DATA_DATE_THROUGH_LOCATION = [
    {
        id: 1,
        date: 'Hôm nay',
        detail: DateTime.formatVietnameseData(dayjs())
    },
    {
        id: 2,
        date: 'Ngày mai',
        detail: DateTime.formatVietnameseData(dayjs().add(1, 'day'))
    },
]

export const DATA_TYPE: IType[] = [
    {
        id: 1,
        label: 'Nhóm người',
        children: [
            { id: 1, label: 'Gia đình', count: 50, id_type: 1},
            { id: 2, label: 'Thanh thiếu niên', count: 27, id_type: 1},
            { id: 3, label: 'Truy cập', count: 0, id_type: 1},
            { id: 4, label: 'Giáo viên', count: 0, id_type: 1},
            { id: 5, label: 'Thành viên', count: 0, id_type: 1},
        ]
    },
    {
        id: 2,
        label: 'Vị trí địa điểm',
        children: [
            { id: 1, label: 'Bảo tàng Tiffany Hà Nội', count: 2, id_type: 2},
            { id: 2, label: 'Bảo tàng Tiffany Thành phố Hồ Chí Minh', count: 1, id_type: 2},
            { id: 3, label: 'Thành phố Quảng Ninh', count: 0, id_type: 2},
            { id: 4, label: 'Thành phố Hải Phòng', count: 0, id_type: 2},
            { id: 5, label: 'Thành phố Nha Trang', count: 0, id_type: 2},
        ]
    },
    {
        id: 3,
        label: 'Thể loại',
        children: [
            { id: 1, label: 'Nghệ thuật Tiffany', count: 102, id_type: 3},
            { id: 2, label: 'Triển lãm nghệ thuật', count: 38, id_type: 3},
            { id: 3, label: 'Chương trình giao lưu nghệ thuật', count: 3, id_type: 3},
            { id: 4, label: 'Giải thưởng nghệ thuật trưng bày', count: 218, id_type: 3},
            { id: 5, label: 'Câu lạc bộ thành viên', count: 20, id_type: 3},
        ]
    },
]

export const DATA_TYPE_EVENT: IType[] = [
    {
        id: 1,
        label: 'Khán giả',
        children: [
            { id: 1, label: 'Gia đình', count: 50, id_type: 1},
            { id: 2, label: 'Thanh thiếu niên', count: 27, id_type: 1},
            { id: 3, label: 'Truy cập', count: 0, id_type: 1},
            { id: 4, label: 'Giáo viên', count: 0, id_type: 1},
            { id: 5, label: 'Thành viên', count: 0, id_type: 1},
        ]
    },
    {
        id: 2,
        label: 'Vị trí địa điểm',
        children: [
            { id: 1, label: 'Bảo tàng Tiffany Hà Nội', count: 2, id_type: 2},
            { id: 2, label: 'Bảo tàng Tiffany Thành phố Hồ Chí Minh', count: 1, id_type: 2},
            { id: 3, label: 'Thành phố Quảng Ninh', count: 0, id_type: 2},
            { id: 4, label: 'Thành phố Hải Phòng', count: 0, id_type: 2},
            { id: 5, label: 'Thành phố Nha Trang', count: 0, id_type: 2},
        ]
    },
    {
        id: 3,
        label: 'Giá',
        children: [
            { id: 1, label: 'Miễn phí', count: 23, id_type: 3},
            { id: 2, label: 'Đã trả tiền', count: 1, id_type: 3},
            { id: 3, label: 'Chưa trả tiền', count: 0, id_type: 3},
            { id: 4, label: 'Mất phí tham gia', count: 123, id_type: 3},
        ]
    },
    {
        id: 4,
        label: 'Thể loại',
        children: [
            { id: 1, label: 'Nghệ thuật Tiffany', count: 102, id_type: 4},
            { id: 2, label: 'Triển lãm nghệ thuật', count: 38, id_type: 4},
            { id: 3, label: 'Chương trình giao lưu nghệ thuật', count: 3, id_type: 4},
            { id: 4, label: 'Giải thưởng nghệ thuật trưng bày', count: 218, id_type: 4},
            { id: 5, label: 'Câu lạc bộ thành viên', count: 20, id_type: 4},
        ]
    },
]

export const DATA_INFO_EXPERIENCE: IInfoExperience[] = [
    {
        id: 1,
        label: 'Triển lãm "Ánh dương xanh"',
        image_url: image_info_1,
        content: 'Dành một giờ để khám phá sâu một phần bộ sưu tập của TIFFANY, từ nghệ thuật Ai Cập cổ đại đến tranh Ấn tượng Pháp, hàng dệt may Hồi giáo hoặc tác phẩm của các nghệ sĩ đương đại. Lưu ý: Số lượng có hạn; ai đến trước được phục vụ trước',
        open: 'Giờ mở cửa: thứ hai - chủ nhật',
        hour: '10 AM - 17 PM'
    },
    {
        id: 2,
        label: 'Chương trình khai trương',
        image_url: image_info_2,
        content: 'Khám phá các tác phẩm nghệ thuật trải dài 5.000 năm nghệ thuật và văn hóa trong bộ sưu tập đa dạng của Bảo tàng. Các tour tham quan khởi hành từ Vélez Blanco Patio, Phòng trưng bày 534. Số lượng có hạn: ai đến trước được phục vụ trước.',
        open: 'Giờ mở cửa: thứ tư - thứ năm',
        hour: '10 AM - 17 PM'
    },
    {
        id: 3,
        label: 'Tiffany và các tác phẩm',
        image_url: image_info_3,
        content: "Visita Guidata dei Capolavori bằng tiếng Ý. Gratuita con l'acquisto del biglietto d'ingresso. Scoprite le opere d'arte attraverso le collezioni del Museo che coprono piu' di 5000 năm về các câu chuyện và nền.",
        open: 'Giờ mở cửa: thứ hai - thứ ba',
        hour: '10 AM - 17 PM'
    },
    {
        id: 4,
        label: 'Khu triển lãm nghệ thuật',
        image_url: image_info_4,
        content: 'Dành một giờ để khám phá sâu một phần bộ sưu tập của The Met, từ nghệ thuật Ai Cập cổ đại đến tranh Ấn tượng Pháp, hàng dệt may Hồi giáo hoặc tác phẩm của các nghệ sĩ đương đại. Lưu ý: Số lượng có hạn; ai đến trước được phục vụ trước',
        open: 'Giờ mở cửa: thứ sáu - chủ nhật',
        hour: '10 AM - 17 PM'
    },
]

export const DATA_EXHIBITION_RECENTLY_OPENED: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: card_member,
        title: 'Thẻ thành viên',
        content: 'Truyền phát nội dung Hướng dẫn bằng âm thanh cho hàng ngàn tác phẩm nghệ thuật trong các phòng trưng bày và một số triển lãm hiện tại.',
        url: '/card-member'
    },
    {
        id: 2,
        image_url: live_2,
        title: 'Bộ sưu tập tác phẩm',
        content: 'Khám phá Bảo tàng cùng gia đình với hướng dẫn viên đặc biệt, sự kiện và nhiều hơn thế nữa.',
        url: '/museum-collection'
    },
    {
        id: 3,
        image_url: find_museum,
        title: 'Tìm hiểu về bảo tàng',
        content: 'Truyền tải nội dung bằng AV thực tế ảo hình ảnh và âm thanh sống động, chân thực tạo cảm giác cho người xem ở không gian thực.',
        url: '/home'
    },
]

export const DATA_EXHIBITION_ABOUT_TO_CLOSE: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: collection,
        title: 'Bộ sưu tập tác phẩm',
        content: 'Khám phá Bảo tàng cùng gia đình với hướng dẫn viên đặc biệt, sự kiện và nhiều hơn thế nữa.'
    },
    {
        id: 2,
        image_url: find_museum,
        title: 'Tìm hiểu về bảo tàng',
        content: 'Truyền tải nội dung bằng AV thực tế ảo hình ảnh và âm thanh sống động, chân thực tạo cảm giác cho người xem ở không gian thực.'
    },
    {
        id: 3,
        image_url: card_member,
        title: 'Thẻ thành viên',
        content: 'Truyền phát nội dung Hướng dẫn bằng âm thanh cho hàng ngàn tác phẩm nghệ thuật trong các phòng trưng bày và một số triển lãm hiện tại.'
    },
]

export const DATA_EXHIBITION_IN_PROGRESS: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: find_museum,
        title: 'Tìm hiểu về bảo tàng',
        content: 'Truyền tải nội dung bằng AV thực tế ảo hình ảnh và âm thanh sống động, chân thực tạo cảm giác cho người xem ở không gian thực.'
    },
    {
        id: 2,
        image_url: card_member,
        title: 'Thẻ thành viên',
        content: 'Truyền phát nội dung Hướng dẫn bằng âm thanh cho hàng ngàn tác phẩm nghệ thuật trong các phòng trưng bày và một số triển lãm hiện tại.'
    },
    {
        id: 3,
        image_url: collection,
        title: 'Bộ sưu tập tác phẩm',
        content: 'Khám phá Bảo tàng cùng gia đình với hướng dẫn viên đặc biệt, sự kiện và nhiều hơn thế nữa.'
    },
]

export const DATA_INFO_EVENT_PERFORMANCE: IInfoExperience[] = [
    {
        id: 1,
        label: 'Sự kiện tiếp đón thành viên mới',
        image_url: ticket_1,
        content: 'Dành một giờ để khám phá sâu một phần bộ sưu tập của TIFFANY, từ nghệ thuật Ai Cập cổ đại đến tranh Ấn tượng Pháp, hàng dệt may Hồi giáo hoặc tác phẩm của các nghệ sĩ đương đại. Lưu ý: Số lượng có hạn; ai đến trước được phục vụ trước',
        open: 'Giờ mở cửa: thứ hai - chủ nhật',
        hour: '10 AM - 17 PM'
    },
    {
        id: 2,
        label: 'Chương trình khai trương',
        image_url: ticket_2,
        content: 'Khám phá các tác phẩm nghệ thuật trải dài 5.000 năm nghệ thuật và văn hóa trong bộ sưu tập đa dạng của Bảo tàng. Các tour tham quan khởi hành từ Vélez Blanco Patio, Phòng trưng bày 534. Số lượng có hạn: ai đến trước được phục vụ trước.',
        open: 'Giờ mở cửa: thứ tư - thứ năm',
        hour: '10 AM - 17 PM'
    },
    {
        id: 3,
        label: 'Tác phẩm thuộc giải nghệ thuật',
        image_url: ticket_3,
        content: "Visita Guidata dei Capolavori bằng tiếng Ý. Gratuita con l'acquisto del biglietto d'ingresso. Scoprite le opere d'arte attraverso le collezioni del Museo che coprono piu' di 5000 năm về các câu chuyện và nền.",
        open: 'Giờ mở cửa: thứ hai - thứ ba',
        hour: '10 AM - 17 PM'
    },
    {
        id: 4,
        label: 'Trao giải thành viên xuất sắc',
        image_url: image_exhibition,
        content: 'Dành một giờ để khám phá sâu một phần bộ sưu tập của The Met, từ nghệ thuật Ai Cập cổ đại đến tranh Ấn tượng Pháp, hàng dệt may Hồi giáo hoặc tác phẩm của các nghệ sĩ đương đại. Lưu ý: Số lượng có hạn; ai đến trước được phục vụ trước',
        open: 'Giờ mở cửa: thứ sáu - chủ nhật',
        hour: '10 AM - 17 PM'
    },
]

export const DATA_ABOUT_US_1: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: image_about_us_1,
        title: 'Chính sách và tài liệu',
        content: 'Mô tả chi tiết',
        type: 'policy_material'
    },
    {
        id: 2,
        image_url: image_about_us_2,
        title: 'Thông tin liên lạc',
        content: 'Mô tả chi tiết',
        type: 'contact-information'
    },
    {
        id: 3,
        image_url: live_3,
        title: 'Về The Tiffany',
        content: 'Mô tả chi tiết',
        type: 'about-us'
    }
]

export const DATA_ABOUT_US_2: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: image_about_us_3,
        title: 'Tình nguyện viên',
        content: 'Truyền phát nội dung bổ ích và trao đổi về các nghệ thuật từ các bạn trẻ đầy nhiệt huyết và đam mê nghệ thuật. Học hỏi những trường phái nghệ thuật thú vị và bổ ích.'
    },
    {
        id: 2,
        image_url: image_about_us_4,
        title: 'Hỗ trợ bảo tàng',
        content: 'Chương trình đào tạo quản lý nghệ thuật cho bảo tàng: Bạn có thể trở thành chuyên gia quản lý nghệ thuật được hay không? Tham gia cùng chúng tôi nhé!'
    },
]

export const DATA_ABOUT_US_3: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: image_about_us_5,
        title: 'Cơ hội nghề nghiệp',
        content: 'Mô tả chi tiết.',
        type: 'career_opportunities'
    },
    {
        id: 2,
        image_url: image_about_us_6,
        title: 'Thực tập',
        content: 'Mô tả chi tiết.',
        type: 'intership'
    },
    {
        id: 3,
        image_url: image_about_us_7,
        title: 'Chương trình kiến thức',
        content: 'Mô tả chi tiết.',
        type: 'knowledge_program'
    },
]

export const DATA_ABOUT_MATERIAL: IICommonLandingPage[] = [
    {
        id: 1,
        image_url: image_about_us_1,
        title: 'Chính sách và tài liệu',
        content: 'Mô tả chi tiết',
        type: 'policy_material_detail'
    },
    {
        id: 2,
        image_url: image_about_us_2,
        title: 'Thông tin liên lạc',
        content: 'Mô tả chi tiết',
        type: 'contact-information'
    },
    {
        id: 3,
        image_url: live_3,
        title: 'Về The Tiffany',
        content: 'Mô tả chi tiết',
        type: 'about-us'
    },
    {
        id: 4,
        image_url: image_policy_1,
        title: 'Chính sách và tài liệu',
        content: 'Mô tả chi tiết',
        type: 'policy_material_detail'
    },
    {
        id: 5,
        image_url: image_policy_2,
        title: 'Thông tin liên lạc',
        content: 'Mô tả chi tiết',
        type: 'contact-information'
    },
    {
        id: 6,
        image_url: image_policy_3,
        title: 'Về The Tiffany',
        content: 'Mô tả chi tiết',
        type: 'about-us'
    }
]
