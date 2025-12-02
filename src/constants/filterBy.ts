import { v4 as uuidv4} from "uuid";
export const DATA_DATE_ERA: { id: string, label: string, value: string }[] = [
    {
        id: uuidv4(),
        label: '8000 - 2000 TCN',
        value: '8000_2000_B.C'
    },
    {
        id: uuidv4(),
        label: '2000 - 1000 TCN',
        value: '2000_1000_B.C'
    },
    {
        id: uuidv4(),
        label: '1000 TCN - CN 1',
        value: '1000_B.C_A.D.1'
    },
    {
        id: uuidv4(),
        label: 'CN 1 - 500',
        value: 'A.D_1_500'
    },
    {
        id: uuidv4(),
        label: 'CN 500 - 1000',
        value: 'A.D_500_1000'
    },
    {
        id: uuidv4(),
        label: 'CN 1000 - 1400',
        value: 'A.D_1000_1400'
    },
    {
        id: uuidv4(),
        label: 'CN 1400 - 1600',
        value: 'A.D_1400_1600'
    },
    {
        id: uuidv4(),
        label: 'CN 1600 - 1800',
        value: 'A.D_1600_1800'
    },
    {
        id: uuidv4(),
        label: 'CN 1800 - 1900',
        value: 'A.D_1800_1900'
    },
    {
        id: uuidv4(),
        label: 'CN 1900 - nay',
        value: 'A.D_1900_present'
    },
    {
        id: uuidv4(),
        label: 'Cuối thế kỷ 19',
        value: 'late_19th_century'
    },
    {
        id: uuidv4(),
        label: 'Giữa thế kỷ 19',
        value: 'mid_19th_century'
    },
    {
        id: uuidv4(),
        label: 'Đầu thế kỷ 19',
        value: 'early_19th_century'
    },
    {
        id: uuidv4(),
        label: 'Cuối thế kỷ 20',
        value: 'late_20th_century'
    },
    {
        id: uuidv4(),
        label: 'Đầu thế kỷ 20',
        value: 'early_20th_century'
    },
    {
        id: uuidv4(),
        label: 'Thập niên 1890',
        value: '1890s'
    },
    {
        id: uuidv4(),
        label: 'Thập niên 1900',
        value: '1900s'
    },
    {
        id: uuidv4(),
        label: 'Thập niên 1910',
        value: '1910s'
    },
    {
        id: uuidv4(),
        label: 'Thập niên 1920',
        value: '1920s'
    },
    {
        id: uuidv4(),
        label: 'Thập niên 1930',
        value: '1930s'
    },
    {
        id: uuidv4(),
        label: 'Giai đoạn Louis Comfort Tiffany (1890 - 1930s)',
        value: 'louis_comfort_tiffany_period'
    },
    {
        id: uuidv4(),
        label: 'Phong trào Nghệ thuật & Thủ công (1880 - 1920)',
        value: 'arts_and_crafts_movement'
    },
    {
        id: uuidv4(),
        label: 'Thời kỳ Art Nouveau (1890 - 1910)',
        value: 'art_nouveau_period'
    },
    {
        id: uuidv4(),
        label: 'Thời kỳ Art Deco (1920 - 1940)',
        value: 'art_deco_period'
    },
]

export const DATA_TYPE_EXHIBIT: { id: string, label: { vi: string, en: string }, value: string }[] = [
    {
        id: uuidv4(),
        label: {
            vi: "Đèn kính màu",
            en: "Stained glass lamp"
        },
        value: 'stained_glass_lamp'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Đèn bàn Tiffany",
            en: "Table lamps Tiffany"
        },
        value: 'table_lamps_tiffany'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Đèn sàn Tiffany",
            en: "Floor lamps Tiffany"
        },
        value: 'floor_lamps_tiffany'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Đèn chùm Tiffany",
            en: "Chandeliers Tiffany"
        },
        value: 'chandeliers_tiffany'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Đèn treo tường Tiffany",
            en: "Wall sconces Tiffany"
        },
        value: 'wall_sconces_tiffany'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Đèn thả kính màu",
            en: "Stained glass hanging lamp"
        },
        value: 'hanging_lamp'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Đèn chụp kính màu",
            en: "Stained glass shade lamp"
        },
        value: 'lamp_shade'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Cửa sổ kính màu",
            en: "Stained glass window"
        },
        value: 'stained_glass_window'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Cửa sổ nhà thờ",
            en: "Cathedral window"
        },
        value: 'cathedral_window'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Cửa sổ hoa hồng",
            en: "Rose window"
        },
        value: 'rose_window'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Cửa sổ hình mũi giáo",
            en: "Lancet window"
        },
        value: 'lancet_window'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Ô kính màu ghép",
            en: "Panel window"
        },
        value: 'panel_window'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Cửa sổ kính ghép chì",
            en: "Leaded glass window"
        },
        value: 'leaded_glass_window'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Tấm kính màu trang trí",
            en: "Stained glass panel"
        },
        value: 'stained_glass_panel'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Tấm kính treo",
            en: "Hanging glass panel"
        },
        value: 'hanging_glass_panel'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Tấm kính màu gắn hộp đèn",
            en: "Lightbox stained panel"
        },
        value: 'lightbox_stained_panel'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Tấm kính màu tôn giáo",
            en: "Regigious panel"
        },
        value: 'regigious_panel'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Bảng kính kể chuyện",
            en: "Narrative panel"
        },
        value: 'narrative_panel'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Cửa kính màu",
            en: "Stained glass door"
        },
        value: 'stained_glass_door'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Ô cửa trên",
            en: "Transom window"
        },
        value: 'transom_window'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Ô cửa bên",
            en: "Sidelight window"
        },
        value: 'sidelight_window'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Giếng trời kính màu",
            en: "Stained glass skylight"
        },
        value: 'skylight'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Tấm kính trần",
            en: "Ceiling panel"
        },
        value: 'ceiling_panel'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Vách ngăn kính màu",
            en: "Stained glass room divider"
        },
        value: 'room_divider'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Tranh ghép kính",
            en: "Glass mosaic painting"
        },
        value: 'glass_mosaic'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Đồ trang trí bằng kính",
            en: "Decorative glass object"
        },
        value: 'decorative_glass_object'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Tượng kính",
            en: "Glass sculpture"
        },
        value: 'glass_sculpture'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Tượng nhỏ bằng kính",
            en: "Glass figurine"
        },
        value: 'glass_figurine'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Hộp trang trí kính màu",
            en: "Stained decorative box"
        },
        value: 'stained_decorative_box'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Khung ảnh kính",
            en: "Photo frame glass"
        },
        value: 'photo_frame_glass'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Gương viền kính màu",
            en: "Mirror with stained glass frame"
        },
        value: 'mirror_with_stained_glass_frame'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Chén thánh kết hợp kính màu",
            en: "Chalice with stained glass"
        },
        value: 'chalice_with_stained_glass'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Tấm kình màu bàn thờ",
            en: "Alter panel with stained glass"
        },
        value: 'altar_panel'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Bảng kính biểu tượng tôn giáo",
            en: "Region icon panel"
        },
        value: 'icon_panel'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Thánh giá rước bằng kính",
            en: "Processional cross glass"
        },
        value: 'processional_cross_glass'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Thanh chì ghép kính",
            en: "Lead came"
        },
        value: 'lead_came'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Dao cắt kính",
            en: "Glass cutter"
        },
        value: 'glass_cutter'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Mỏ hàn chì",
            en: "Soldering iron"
        },
        value: 'soldering_iron'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Mẫu kính màu",
            en: "Stained glass sample"
        },
        value: 'stained_glass_sample'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Bản mẫu thiết kế kính màu",
            en: "Stained glass design pattern"
        },
        value: 'stained_design_pattern'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Cửa sổ Tiffany",
            en: "Tiffany window"
        },
        value: 'tiffany_window'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Bảng kính Tiffany",
            en: "Tiffany panel"
        },
        value: 'tiffany_panel'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Bình kính Favrile",
            en: "Favrile glass vase"
        },
        value: 'favrile_glass_vase'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Bát kính Favrile",
            en: "Favrile glass bowl"
        },
        value: 'favrile_glass_bowl'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Tranh mosaic của Tiffany",
            en: "Mosaic Painting of Tiffany"
        },
        value: 'mosaic_by_tiffany_studios'
    },
    {
        id: uuidv4(),
        label: {
            vi: "Bộ đồ dùng bàn Tiffany",
            en: "Tiffany desk set"
        },
        value: 'tiffany_desk_set'
    },
];

export const DATA_ART_STYLE: { id: string, label: string, value: string }[] = [
    {
        id: uuidv4(),
        label: 'Phong cách Gothic (Đặc trưng bởi cửa sổ hoa hồng, cửa sổ cao hẹp, hoa văn phức tạp)',
        value: 'gothic'
    },
    {
        id: uuidv4(),
        label: 'Phong cách Roman (Đơn giản, tông màu trầm, hình học mạnh)',
        value: 'romanesque'
    },
    {
        id: uuidv4(),
        label: 'Phục hưng (Màu sắc sáng, nhân vật cổ điển, đối xứng)',
        value: 'renaissance'
    },
    {
        id: uuidv4(),
        label: 'Baroque (Giàu chi tiết, chuyển động mạnh, ánh sáng - bóng tối tương phản)',
        value: 'baroque'
    },
    {
        id: uuidv4(),
        label: 'Thời Victoria (Trang trí cầu kỳ, đề tài thiên nhiên, kiến trúc kết hợp kính màu)',
        value: 'victorian'
    },
    {
        id: uuidv4(),
        label: 'Phong cách Tiffany (Kính Favrile, đề tài hoa lá, tự nhiên; đèn Tiffany nổi tiếng)',
        value: 'tiffany_style'
    },
    {
        id: uuidv4(),
        label: 'Nghệ thuật Tân Nghệ (Đường cong uốn lượn, hoa lá, yếu tố hữu cơ)',
        value: 'art_nouveau'
    },
    {
        id: uuidv4(),
        label: 'Nghệ thuật & Thủ công (Đề cao thủ công mỹ nghệ, họa tiết đơn giản, tự nhiên)',
        value: 'arts_and_crafts'
    },
    {
        id: uuidv4(),
        label: 'Nghệ thuật Trang trí (Hình học mạnh, mảng màu, đường nét dứt khoát)',
        value: 'art_deco'
    },
    {
        id: uuidv4(),
        label: 'Hiện đại (Hình khối tối giản, màu sắc mạnh, bố cục tự do)',
        value: 'modernism'
    },
    {
        id: uuidv4(),
        label: 'Kình màu đương đại (Kỹ thuật mới, kết hợp vật liệu khác, hình học trừu tượng)',
        value: 'contemporary_stained_glass'
    },
    {
        id: uuidv4(),
        label: 'Trừu tượng (Phi hiện thực, dựa vào hình - màu - đường nét)',
        value: 'abstract'
    },
    {
        id: uuidv4(),
        label: 'Tượng trưng (Hình ảnh ẩn dụ, màu sắc mang nghĩa biểu tượng)',
        value: 'symbolist'
    },
    {
        id: uuidv4(),
        label: 'Biểu hiện (Màu sắc mạnh, cảm xúc chi phối hình ảnh)',
        value: 'expressionism'
    },
    {
        id: uuidv4(),
        label: 'Byzantine (Nền vàng, biểu tượng tôn giáo, hình dạng cổ điển)',
        value: 'byzantine'
    },
    {
        id: uuidv4(),
        label: 'Trung cổ (Các bảng kính tôn giáo, nhân vật thánh kinh, hình họa đơn sơ)',
        value: 'medieval'
    },
    {
        id: uuidv4(),
        label: 'Phong cách Celtic (Họa tiết nút thắt, hình xoắn, biểu tượng phương Bắc)',
        value: 'celtic'
    },
    {
        id: uuidv4(),
        label: 'Phong cách Jugendstil (Biến thể Đức của Art Nouvean, màu pastel, hoa văn hữu cơ)',
        value: 'jugendstil'
    },
    {
        id: uuidv4(),
        label: 'Phong cách Prairie(Mỹ) (Đường thẳng, hình học, màu trầm - thường dùng trong kiến trúc Frank Lloyd Wright)',
        value: 'prairie_style'
    },
    {
        id: uuidv4(),
        label: 'Trường phái Ấn tượng (Màu sắc loang, ánh sáng tự nhiên, cảnh quan mềm mại)',
        value: 'impressionism-inspired_stained_glass'
    },
    {
        id: uuidv4(),
        label: 'Phong cách Lấy cảm hứng từ thiên nhiên (Hình ảnh hoa, lá, chim, bướm, côn trùng, phong cảnh; Đường cong mềm, màu sắc hữu cơ)',
        value: 'nature_inspired'
    },
    {
        id: uuidv4(),
        label: 'Phong cách hình học (Đường thẳng, hình khối; Nhịp điệu lặp lại đều)',
        value: 'geometric_patterns'
    }
]

export const DATA_PATTERNS: { id: string, label: string, value: string, options: { id: string, label: string, value: string }[]}[] = [
    {
        id: uuidv4(),
        label: 'Họa tiết thiên nhiên',
        value: 'nature_motifs',
        options: [
            {
                id: uuidv4(),
                label: 'Họa tiết hoa',
                value: 'floral_motifs'
            },
            {
                id: uuidv4(),
                label: 'Họa tiết lá, tán cây',
                value: 'leaf/foliage_motifs'
            },
            {
                id: uuidv4(),
                label: 'Họa tiết dây leo',
                value: 'vine_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết cây',
                value: 'tree_motifs'
            },
            {
                id: uuidv4(),
                label: 'Họa tiết phong cảnh',
                value: 'landscape_motifs'
            },
            {
                id: uuidv4(),
                label: 'Họa tiết Mặt trời / Bình minh / Hoàng hôn',
                value: 'sun/sunrise/sunset_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết động vật',
                value: 'animal_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết chim',
                value: 'bird_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết bướm',
                value: 'butterfly_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết côn trùng',
                value: 'insect_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết cá',
                value: 'fish_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết lấy cảm hứng từ thiên nhiên',
                value: 'nature-inspired_motifs'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Họa tiết hình học',
        value: 'geometric_motifs',
        options: [
            {
                id: uuidv4(),
                label: 'Họa tiết hình học',
                value: 'geometric_patterns'
            },
            {
                id: uuidv4(),
                label: 'Họa tiết dạng lưới',
                value: 'grid_patterns'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết đa giác',
                value: 'polygon_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết chữ V',
                value: 'chevron_patterns'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết xoắn ốc',
                value: 'spiral_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết đối xứng',
                value: 'symmetrical_patterns'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết hình học trừu tượng',
                value: 'abstract_geometric_patterns'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Họa tiết tôn giáo',
        value: 'religious_motifs',
        options: [
            {
                id: uuidv4(),
                label: 'Cảnh Kinh Thánh',
                value: 'biblical_scenes'
            },
            {
                id: uuidv4(),
                label: 'Các vị thánh',
                value: 'saints'
            },
            {
                id: uuidv4(),
                label: 'Thiên thần',
                value: 'angels'
            },
            {
                id: uuidv4(),
                label: 'Thánh giá',
                value: 'crucifix'
            },
            {
                id: uuidv4(),
                label: 'Vầng sáng',
                value: 'halo_motifs'
            },
            {
                id: uuidv4(),
                label: 'Đức Mẹ và Hài Đồng',
                value: 'madonna_and_child'
            },
            {
                id: uuidv4(),
                label: 'Biểu tượng nhà thờ',
                value: 'church_iconography'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết mang tính biểu tượng',
                value: 'symbolic_motifs'
            },
        ]
    },
    {
        id: uuidv4(),
        label: 'Họa tiết nhân vật',
        value: 'human_figure_motifs',
        options: [
            {
                id: uuidv4(),
                label: 'Họa tiết chân dung',
                value: 'portrait_motifs'
            },
            {
                id: uuidv4(),
                label: 'Nhân vật thần thoại',
                value: 'mythological_figures'
            },
            {
                id: uuidv4(),
                label: 'Nhân vật lịch sử',
                value: 'historical_figures'
            },
            {
                id: uuidv4(),
                label: 'Cảnh kể chuyện',
                value: 'narrative_scenes'
            },
            {
                id: uuidv4(),
                label: 'Nhân vật ngụ ngôn',
                value: 'allegorical_figures'
            },
            {
                id: uuidv4(),
                label: 'Cảnh đời sống',
                value: 'everyday_life_scenes'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Họa tiết trang trí',
        value: 'decorative_motifs',
        options: [
            {
                id: uuidv4(),
                label: 'Họa tiết cuộn',
                value: 'scroll_motifs'
            },
            {
                id: uuidv4(),
                label: 'Họa tiết ren/ mảnh',
                value: 'filigree_motifs'
            },
            {
                id: uuidv4(),
                label: 'Viền trang trí',
                value: 'pattern_borders'
            },
            {
                id: uuidv4(),
                label: 'Họa tiết mosaic',
                value: 'mosaic_motifs'
            },
            {
                id: uuidv4(),
                label: 'Họa tiết huy hiệu',
                value: 'heraldic_motifs'
            },
            {
                id: uuidv4(),
                label: 'Đường cong Art Nouveau',
                value: 'art_nouveau_curves'
            },
            {
                id: uuidv4(),
                label: 'Họa tiết hoa phong cách Tiffany',
                value: 'tiffany_floral_motifs'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Họa tiết biểu tượng',
        value: 'symbolic_motifs',
        options: [
            {
                id: uuidv4(),
                label: 'Biểu tượng hy vọng',
                value: 'symbols_of_hope'
            },
            {
                id: uuidv4(),
                label: 'Biểu tượng sự thuần khiết',
                value: 'symbols_of_purity'
            },
            {
                id: uuidv4(),
                label: 'Biểu tượng ánh sáng',
                value: 'light_motifs'
            },
            {
                id: uuidv4(),
                label: 'Biểu tượng sinh – tử',
                value: 'life&death_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết tâm linh',
                value: 'spiritual_motifs'
            },
            {
                id: uuidv4(),
                label: 'Biểu tượng văn hoá',
                value: 'cultural_symbols'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Họa tiết kiến trúc',
        value: 'architectural_motifs',
        options: [
            {
                id: uuidv4(),
                label: 'Vòm cong',
                value: 'arches'
            },
            {
                id: uuidv4(),
                label: 'Cột',
                value: 'columns'
            },
            {
                id: uuidv4(),
                label: 'Hoa hồng',
                value: 'rose_windows'
            },
            {
                id: uuidv4(),
                label: 'Vòm nhọn',
                value: 'lancet_arches'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết hoa văn Gothic',
                value: 'gothic_tracery_patterns'
            },
            {
                id: uuidv4(),
                label: 'Hoa văn ghép chì',
                value: 'leaded_glass_patterns'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Họa tiết tĩnh vật',
        value: 'object_motifs',
        options: [
            {
                id: uuidv4(),
                label: 'Hoạ tiết bình hoa',
                value: 'vase_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết trái cây',
                value: 'fruit_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết nến',
                value: 'candle_motifs'
            },
            {
                id: uuidv4(),
                label: 'Hoạ tiết sách',
                value: 'book_motifs'
            },
            {
                id: uuidv4(),
                label: 'Đồ vật sinh hoạt',
                value: 'household_objects'
            }
        ]
    }
];

export const DATA_GEOGRAPHIC_LOCATION: { id: string, label: string, value: string, options: { id: string, label: string, value: string }[]}[] = [
    {
        id: uuidv4(),
        label: 'Châu Âu',
        value: 'europe',
        options: [
            {
                id: uuidv4(),
                label: 'Pháp',
                value: 'france'
            },
            {
                id: uuidv4(),
                label: 'Anh',
                value: 'england'
            },
            {
                id: uuidv4(),
                label: 'Ireland',
                value: 'ireland'
            },
            {
                id: uuidv4(),
                label: 'Scotland',
                value: 'scotland'
            },
            {
                id: uuidv4(),
                label: 'Đức',
                value: 'germany'
            },
            {
                id: uuidv4(),
                label: 'Bỉ',
                value: 'belgium'
            },
            {
                id: uuidv4(),
                label: 'Hà Lan',
                value: 'netherlands'
            },
            {
                id: uuidv4(),
                label: 'Thụy Sĩ',
                value: 'switzerland'
            },
            {
                id: uuidv4(),
                label: 'Ý',
                value: 'italy'
            },
            {
                id: uuidv4(),
                label: 'Tây Ban Nha',
                value: 'spain'
            },
            {
                id: uuidv4(),
                label: 'Bồ Đào Nha',
                value: 'portugal'
            },
            {
                id: uuidv4(),
                label: 'Hy Lạp',
                value: 'greece'
            },
            {
                id: uuidv4(),
                label: 'Đan Mạch',
                value: 'denmark'
            },
            {
                id: uuidv4(),
                label: 'Thụy Điển',
                value: 'sweden'
            },
            {
                id: uuidv4(),
                label: 'Na Uy',
                value: 'norway'
            },
            {
                id: uuidv4(),
                label: 'Phần Lan',
                value: 'finland'
            },
            {
                id: uuidv4(),
                label: 'Iceland',
                value: 'iceland'
            },
            {
                id: uuidv4(),
                label: 'Nga',
                value: 'russia'
            },
            {
                id: uuidv4(),
                label: 'Ba Lan',
                value: 'poland'
            },
            {
                id: uuidv4(),
                label: 'Cộng hòa Séc',
                value: 'czech_republic'
            },
            {
                id: uuidv4(),
                label: 'Slovakia',
                value: 'slovakia'
            },
            {
                id: uuidv4(),
                label: 'Hungary',
                value: 'hungary'
            },
            {
                id: uuidv4(),
                label: 'Romania',
                value: 'romania'
            },
            {
                id: uuidv4(),
                label: 'Ukraina',
                value: 'ukraine'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Châu Mỹ',
        value: 'americas',
        options: [
            {
                id: uuidv4(),
                label: 'Hoa Kỳ',
                value: 'united_states'
            },
            {
                id: uuidv4(),
                label: 'Canada',
                value: 'canada'
            },
            {
                id: uuidv4(),
                label: 'Mexico',
                value: 'mexico'
            },
            {
                id: uuidv4(),
                label: 'Brazil',
                value: 'brazil'
            },
            {
                id: uuidv4(),
                label: 'Argentina',
                value: 'argentina'
            },
            {
                id: uuidv4(),
                label: 'Chile',
                value: 'chile'
            },
            {
                id: uuidv4(),
                label: 'Peru',
                value: 'peru'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Châu Á',
        value: 'asia',
        options: [
            {
                id: uuidv4(),
                label: 'Nhật Bản',
                value: 'japan'
            },
            {
                id: uuidv4(),
                label: 'Trung Quốc',
                value: 'china'
            },
            {
                id: uuidv4(),
                label: 'Hàn Quốc',
                value: 'south_korea'
            },
            {
                id: uuidv4(),
                label: 'Ấn Độ',
                value: 'india'
            },
            {
                id: uuidv4(),
                label: 'Thái Lan',
                value: 'thailand'
            },
            {
                id: uuidv4(),
                label: 'Việt Nam',
                value: 'vietnam'
            },
            {
                id: uuidv4(),
                label: 'Indonesia',
                value: 'indonesia'
            },
            {
                id: uuidv4(),
                label: 'Philippines',
                value: 'philippines'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Trung Đông',
        value: 'middle_east',
        options: [
            {
                id: uuidv4(),
                label: 'Thổ Nhĩ Kỳ',
                value: 'turkey'
            },
            {
                id: uuidv4(),
                label: 'Iran',
                value: 'iran'
            },
            {
                id: uuidv4(),
                label: 'Iraq',
                value: 'iraq'
            },
            {
                id: uuidv4(),
                label: 'Israel',
                value: 'israel'
            },
            {
                id: uuidv4(),
                label: 'Ả Rập Xê Út',
                value: 'saudi_arabia'
            },
            {
                id: uuidv4(),
                label: 'UAE',
                value: 'united_arab_emirates'
            },
            {
                id: uuidv4(),
                label: 'Lebanon',
                value: 'lebanon'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Châu Phi',
        value: 'africa',
        options: [
            {
                id: uuidv4(),
                label: 'Ai Cập',
                value: 'egypt'
            },
            {
                id: uuidv4(),
                label: 'Ma Rốc',
                value: 'morocco'
            },
            {
                id: uuidv4(),
                label: 'Nam Phi',
                value: 'south_africa'
            },
            {
                id: uuidv4(),
                label: 'Kenya',
                value: 'kenya'
            },
            {
                id: uuidv4(),
                label: 'Nigeria',
                value: 'nigeria'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Châu Đại Dương',
        value: 'oceania',
        options: [
            {
                id: uuidv4(),
                label: 'Úc',
                value: 'australia'
            },
            {
                id: uuidv4(),
                label: 'New Zealand',
                value: 'new_zealand'
            },
            {
                id: uuidv4(),
                label: 'Fiji',
                value: 'fiji'
            }
        ]
    },
    {
        id: uuidv4(),
        label: 'Vùng văn hóa đặc thù',
        value: 'special_cultural_regions',
        options: [
            {
                id: uuidv4(),
                label: 'Châu Âu thời Gothic',
                value: 'gothic_europe'
            },
            {
                id: uuidv4(),
                label: 'Anh thời Trung cổ',
                value: 'medieval_britain'
            },
            {
                id: uuidv4(),
                label: 'Đế chế Byzantine',
                value: 'byzantine_empire'
            },
            {
                id: uuidv4(),
                label: 'Ý thời Phục hưng',
                value: 'renaissance_italy'
            },
            {
                id: uuidv4(),
                label: 'Vùng Celtic',
                value: 'celtic_regions'
            },
            {
                id: uuidv4(),
                label: 'Các nước Bắc Âu',
                value: 'nordic_countries'
            }
        ]
    }
];

export const DATA_ORIGIN_FACTORY: { id: string, label: string, value: string }[] = [
    {
        id: uuidv4(),
        label: 'Xưởng Tiffany',
        value: 'tiffany_studio'
    },
    {
        id: uuidv4(),
        label: 'Xưởng La Farge',
        value: 'la_farge_studio'
    },
    {
        id: uuidv4(),
        label: 'Xưởng Morris & Co. (Anh)',
        value: 'Morris&Co.(UK)'
    },
    {
        id: uuidv4(),
        label: 'Xưởng Lamb',
        value: 'lamb_studios'
    },
    {
        id: uuidv4(),
        label: 'Xưởng Kính Đức (Bavaria, Cologne)',
        value: 'german_glass_workshops'
    },
    {
        id: uuidv4(),
        label: 'Các xưởng Nghệ thuật Nouveau Pháp (Trường phái Nancy)',
        value: 'french_art_nouveau_studios'
    },
    {
        id: uuidv4(),
        label: 'Hiệp hội Thủy tinh Venice (Ý)',
        value: 'italian_venetian_glass_guilds'
    },
    {
        id: uuidv4(),
        label: 'Lò thủy tinh Tiffany & Co',
        value: 'L.C._Tiffany&Co._glass_furnaces'
    },
    {
        id: uuidv4(),
        label: 'Các xưởng phong cách Prairie (liên quan Frank Lloyd Wright)',
        value: 'studios_of_american_prairie_style'
    },
    {
        id: uuidv4(),
        label: 'Xưởng thủy tinh nghệ thuật Chicago',
        value: 'chicago_art_glass_workshops'
    },
    {
        id: uuidv4(),
        label: 'Xưởng kính màu Bờ Tây Hoa Kỳ',
        value: 'west_coast_stained_glass_studios'
    },
    {
        id: uuidv4(),
        label: 'Xưởng thủy tinh Nhật Bản thời Edo–Meiji',
        value: 'Japanese_Edo–Meiji_glass_workshops'
    },
    {
        id: uuidv4(),
        label: 'Lò thủy tinh triều đại Joseon (Hàn Quốc)',
        value: 'Korean_Joseon_glass_makers'
    },
    {
        id: uuidv4(),
        label: 'Xưởng thủy tinh hoàng gia Trung Quốc (nhà Thanh)',
        value: 'Chinese_Imperial_glass_studios'
    },
    {
        id: uuidv4(),
        label: 'Xưởng kính màu Nhật Bản đương đại',
        value: 'contemporary_Japanese_stained_glass_studios'
    },
    {
        id: uuidv4(),
        label: 'Làng nghề kính/thuỷ tinh Việt Nam',
        value: 'Vietnamese_traditional_glass_craft_villages'
    },
    {
        id: uuidv4(),
        label: 'Xưởng kính trang trí Ấn Độ (Rajasthan)',
        value: 'Indian_decorative_glass_studios'
    }
]