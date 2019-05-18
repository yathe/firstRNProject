
import React, {Component} from 'react';
import {Button,
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import ThirdPage from "./ThirdPage";

const moview = 'https://api.douban.com/v2/movie/subject/26363254?apikey=0b2bdeda43b5688921839c8ecb20399b&city=北京&client=something&udid=dddddddddddddddddddddd/1';
const movieInfo = 'https://api.douban.com/v2/movie/subject';
const {width, height} = Dimensions.get('window');

export default class DetailPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            isExpend:false,
            num: 4,
            data: {
                rating: {
                    max: 10,
                    average: 7.1,
                    details: {
                        1: 6045,
                        2: 9558,
                        3: 33629,
                        4: 36351,
                        5: 21050
                    },
                    stars: "35",
                    min: 0
                },
                reviews_count: 9574,
                videos: [
                    {
                        source: {
                            literal: "qq",
                            pic: "https://img3.doubanio.com/f/movie/0a74f4379607fa731489d7f34daa545df9481fa0/pics/movie/video-qq.png",
                            name: "腾讯视频"
                        },
                        sample_link: "http://v.qq.com/x/cover/wi8e2p5kirdaf3j.html?ptag=douban.movie",
                        video_id: "wi8e2p5kirdaf3j",
                        need_pay: true
                    },
                    {
                        source: {
                            literal: "youku",
                            pic: "https://img1.doubanio.com/f/movie/caa07065259b352b164109b6767ea00f83d95221/pics/movie/video-youku.png",
                            name: "优酷视频"
                        },
                        sample_link: "http://v.youku.com/v_show/id_XMzA4OTA4OTQyMA==.html?tpa=dW5pb25faWQ9MzAwMDA4XzEwMDAwMl8wMl8wMQ&refer=esfhz_operation.xuka.xj_00003036_000000_FNZfau_19010900",
                        video_id: "XMzA4OTA4OTQyMA==",
                        need_pay: true
                    },
                    {
                        source: {
                            literal: "iqiyi",
                            pic: "https://img3.doubanio.com/f/movie/7c9e516e02c6fe445b6559c0dd2a705e8b17d1c9/pics/movie/video-iqiyi.png",
                            name: "爱奇艺视频"
                        },
                        sample_link: "http://www.iqiyi.com/v_19rre19on4.html?vfm=m_331_dbdy&fv=4904d94982104144a1548dd9040df241",
                        video_id: "19rre19on4",
                        need_pay: true
                    }
                ],
                wish_count: 77409,
                original_title: "战狼2",
                blooper_urls: [
                    "http://vt1.doubanio.com/201905131448/6d904c8b799d225158ced43c17690aed/view/movie/M/302200549.mp4",
                    "http://vt1.doubanio.com/201905131448/63644ea94c0ef0f44382392a50a607b5/view/movie/M/302200359.mp4",
                    "http://vt1.doubanio.com/201905131448/683f9652f417032231e38c1137f23cd1/view/movie/M/302200017.mp4",
                    "http://vt1.doubanio.com/201905131448/13b1d85e04e38d61c415595111b94d8a/view/movie/M/302190981.mp4"
                ],
                collect_count: 879041,
                images: {
                    small: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2494701965.webp",
                    large: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2494701965.webp",
                    medium: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2494701965.webp"
                },
                douban_site: "",
                year: "2017",
                popular_comments: [
                    {
                        rating: {
                            max: 5,
                            value: 2,
                            min: 0
                        },
                        useful_count: 2770,
                        author: {
                            uid: "cyrus_wong",
                            avatar: "https://img3.doubanio.com/icon/u62974457-11.jpg",
                            signature: "微信公众账号：wali-movie",
                            alt: "https://www.douban.com/people/cyrus_wong/",
                            id: "62974457",
                            name: "瓦力"
                        },
                        subject_id: "26363254",
                        content: "无脑动作片，模仿好些国外大片再想怎样就怎样一股脑堆，槽点巨多，几位主角血厚到科幻级别，吴京重复演满血、红血、中毒、极速回血、爆种...确实很拼但片子太投机取巧，反派照搬上集辱华外国佣兵，目测《战狼3》反派依旧会千篇一律...故事不行堆再多大场面假high瞎燃也没用，《变5》不才刚玩砸么？5/10",
                        created_at: "2017-07-27 23:03:18",
                        id: "1221034678"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 2,
                            min: 0
                        },
                        useful_count: 35302,
                        author: {
                            uid: "z286424115",
                            avatar: "https://img1.doubanio.com/icon/u49114638-18.jpg",
                            signature: "",
                            alt: "https://www.douban.com/people/z286424115/",
                            id: "49114638",
                            name: "俏皮面"
                        },
                        subject_id: "26363254",
                        content: "首映礼看的。太恐怖了这个电影，不讲道理的，完全就是吴京在实现他这个小粉红的英雄梦。各种装备轮番上场，视物理逻辑于不顾，不得不说有钱真好，随意胡闹",
                        created_at: "2017-07-23 16:55:44",
                        id: "1219142673"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 4,
                            min: 0
                        },
                        useful_count: 38661,
                        author: {
                            uid: "reave",
                            avatar: "https://img1.doubanio.com/icon/u1752908-27.jpg",
                            signature: "无话可说",
                            alt: "https://www.douban.com/people/reave/",
                            id: "1752908",
                            name: "谢谢你们的鱼"
                        },
                        subject_id: "26363254",
                        content: "凭良心说，好看到不像《战狼1》的续集，完虐《湄公河行动》。PS：我也是醉了，那些说吴京角色打不死的，我想问你们哪部商业动作片没有个人英雄主义的，真为你们感到丢人。",
                        created_at: "2017-07-23 17:27:48",
                        id: "1219157745"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 2,
                            min: 0
                        },
                        useful_count: 2507,
                        author: {
                            uid: "MovieL",
                            avatar: "https://img1.doubanio.com/icon/u1128221-98.jpg",
                            signature: "卫星号：moviesss",
                            alt: "https://www.douban.com/people/MovieL/",
                            id: "1128221",
                            name: "木卫二"
                        },
                        subject_id: "26363254",
                        content: "人肉手臂升国旗，是其他自干主旋律导演想象不出来的。吴京这个姿势值50亿票房满分。整部电影充斥着极端过火的暴戾杀戮，大意是已经乱成这样，别人都把中国人踩头上了，你还不杀他全家？！但冷静一想就知道，非洲背景中非友爱和平是一家人纯属臆想。全片最跳但也最真实解气，就是一脚揣飞强拆头子。",
                        created_at: "2017-08-10 10:26:22",
                        id: "1227311346"
                    }
                ],
                alt: "https://movie.douban.com/subject/26363254/",
                id: "26363254",
                mobile_url: "https://movie.douban.com/subject/26363254/mobile",
                photos_count: 768,
                pubdate: "2017-07-27",
                title: "战狼2",
                do_count: null,
                has_video: true,
                share_url: "https://m.douban.com/movie/subject/26363254",
                seasons_count: null,
                languages: [
                    "汉语普通话",
                    "英语"
                ],
                schedule_url: "",
                writers: [
                    {
                        avatars: {
                            small: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1549645325.74.webp",
                            large: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1549645325.74.webp",
                            medium: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1549645325.74.webp"
                        },
                        name_en: "Jing Wu",
                        name: "吴京",
                        alt: "https://movie.douban.com/celebrity/1000525/",
                        id: "1000525"
                    },
                    {
                        avatars: {
                            small: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1506837727.07.webp",
                            large: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1506837727.07.webp",
                            medium: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1506837727.07.webp"
                        },
                        name_en: "Qun Dong",
                        name: "董群",
                        alt: "https://movie.douban.com/celebrity/1346473/",
                        id: "1346473"
                    },
                    {
                        avatars: {
                            small: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1370705156.99.webp",
                            large: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1370705156.99.webp",
                            medium: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1370705156.99.webp"
                        },
                        name_en: "Yi Liu",
                        name: "刘毅",
                        alt: "https://movie.douban.com/celebrity/1320809/",
                        id: "1320809"
                    }
                ],
                pubdates: [
                    "2017-07-27(中国大陆)"
                ],
                website: "",
                tags: [
                    "动作",
                    "热血",
                    "军事",
                    "战争",
                    "爱国",
                    "特种部队",
                    "中国大陆",
                    "牛逼",
                    "燃",
                    "2017"
                ],
                has_schedule: false,
                durations: [
                    "123分钟"
                ],
                genres: [
                    "动作",
                    "战争"
                ],
                collection: null,
                trailers: [
                    {
                        medium: "https://img3.doubanio.com/img/trailer/medium/2495453444.jpg?",
                        title: "预告片 (中文字幕)",
                        subject_id: "26363254",
                        alt: "https://movie.douban.com/trailer/220184/",
                        small: "https://img3.doubanio.com/img/trailer/small/2495453444.jpg?",
                        resource_url: "http://vt1.doubanio.com/201905131448/089a4c0bef6373f5087fc532a705e448/view/movie/M/302200184.mp4",
                        id: "220184"
                    },
                    {
                        medium: "https://img3.doubanio.com/img/trailer/medium/2492869575.jpg?",
                        title: "预告片：爱情版 (中文字幕)",
                        subject_id: "26363254",
                        alt: "https://movie.douban.com/trailer/219131/",
                        small: "https://img3.doubanio.com/img/trailer/small/2492869575.jpg?",
                        resource_url: "http://vt1.doubanio.com/201905131448/11907545bdbd7b157f438ede83307152/view/movie/M/302190131.mp4",
                        id: "219131"
                    },
                    {
                        medium: "https://img3.doubanio.com/img/trailer/medium/2482951515.jpg?",
                        title: "预告片：开战版 (中文字幕)",
                        subject_id: "26363254",
                        alt: "https://movie.douban.com/trailer/218775/",
                        small: "https://img3.doubanio.com/img/trailer/small/2482951515.jpg?",
                        resource_url: "http://vt1.doubanio.com/201905131448/55f7d005e553e93302ffad09573120c7/view/movie/M/302180775.mp4",
                        id: "218775"
                    },
                    {
                        medium: "https://img1.doubanio.com/img/trailer/medium/2462633168.jpg?",
                        title: "预告片：非洲行动版 (中文字幕)",
                        subject_id: "26363254",
                        alt: "https://movie.douban.com/trailer/218024/",
                        small: "https://img1.doubanio.com/img/trailer/small/2462633168.jpg?",
                        resource_url: "http://vt1.doubanio.com/201905131448/a554986595bfffba3903d61b13c009f9/view/movie/M/302180024.mp4",
                        id: "218024"
                    }
                ],
                episodes_count: null,
                trailer_urls: [
                    "http://vt1.doubanio.com/201905131448/089a4c0bef6373f5087fc532a705e448/view/movie/M/302200184.mp4",
                    "http://vt1.doubanio.com/201905131448/11907545bdbd7b157f438ede83307152/view/movie/M/302190131.mp4",
                    "http://vt1.doubanio.com/201905131448/55f7d005e553e93302ffad09573120c7/view/movie/M/302180775.mp4",
                    "http://vt1.doubanio.com/201905131448/a554986595bfffba3903d61b13c009f9/view/movie/M/302180024.mp4"
                ],
                has_ticket: false,
                bloopers: [
                    {
                        medium: "https://img3.doubanio.com/img/trailer/medium/2496902556.jpg?",
                        title: "花絮：爆炸特辑 (中文字幕)",
                        subject_id: "26363254",
                        alt: "https://movie.douban.com/trailer/220549/",
                        small: "https://img3.doubanio.com/img/trailer/small/2496902556.jpg?",
                        resource_url: "http://vt1.doubanio.com/201905131448/6d904c8b799d225158ced43c17690aed/view/movie/M/302200549.mp4",
                        id: "220549"
                    },
                    {
                        medium: "https://img3.doubanio.com/img/trailer/medium/2496315935.jpg?",
                        title: "花絮：中美合作特辑 (中文字幕)",
                        subject_id: "26363254",
                        alt: "https://movie.douban.com/trailer/220359/",
                        small: "https://img3.doubanio.com/img/trailer/small/2496315935.jpg?",
                        resource_url: "http://vt1.doubanio.com/201905131448/63644ea94c0ef0f44382392a50a607b5/view/movie/M/302200359.mp4",
                        id: "220359"
                    },
                    {
                        medium: "https://img3.doubanio.com/img/trailer/medium/2494953156.jpg?",
                        title: "花絮：配乐现场特辑",
                        subject_id: "26363254",
                        alt: "https://movie.douban.com/trailer/220017/",
                        small: "https://img3.doubanio.com/img/trailer/small/2494953156.jpg?",
                        resource_url: "http://vt1.doubanio.com/201905131448/683f9652f417032231e38c1137f23cd1/view/movie/M/302200017.mp4",
                        id: "220017"
                    },
                    {
                        medium: "https://img3.doubanio.com/img/trailer/medium/2494823631.jpg?",
                        title: "花絮：口碑特辑 (中文字幕)",
                        subject_id: "26363254",
                        alt: "https://movie.douban.com/trailer/219981/",
                        small: "https://img3.doubanio.com/img/trailer/small/2494823631.jpg?",
                        resource_url: "http://vt1.doubanio.com/201905131448/13b1d85e04e38d61c415595111b94d8a/view/movie/M/302190981.mp4",
                        id: "219981"
                    }
                ],
                clip_urls: [ ],
                current_season: null,
                casts: [
                    {
                        avatars: {
                            small: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1549645325.74.webp",
                            large: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1549645325.74.webp",
                            medium: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1549645325.74.webp"
                        },
                        name_en: "Jing Wu",
                        name: "吴京",
                        alt: "https://movie.douban.com/celebrity/1000525/",
                        id: "1000525"
                    },
                    {
                        avatars: {
                            small: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1415801312.29.webp",
                            large: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1415801312.29.webp",
                            medium: "https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1415801312.29.webp"
                        },
                        name_en: "Frank Grillo",
                        name: "弗兰克·格里罗",
                        alt: "https://movie.douban.com/celebrity/1100321/",
                        id: "1100321"
                    },
                    {
                        avatars: {
                            small: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1401440361.14.webp",
                            large: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1401440361.14.webp",
                            medium: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1401440361.14.webp"
                        },
                        name_en: "Gang Wu",
                        name: "吴刚",
                        alt: "https://movie.douban.com/celebrity/1274840/",
                        id: "1274840"
                    },
                    {
                        avatars: {
                            small: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1553246758.05.webp",
                            large: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1553246758.05.webp",
                            medium: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1553246758.05.webp"
                        },
                        name_en: "Han Zhang",
                        name: "张翰",
                        alt: "https://movie.douban.com/celebrity/1031500/",
                        id: "1031500"
                    }
                ],
                countries: [
                    "中国大陆"
                ],
                mainland_pubdate: "2017-07-27",
                photos: [
                    {
                        thumb: "https://img3.doubanio.com/view/photo/m/public/p2494292760.webp",
                        image: "https://img3.doubanio.com/view/photo/l/public/p2494292760.webp",
                        cover: "https://img3.doubanio.com/view/photo/sqs/public/p2494292760.webp",
                        alt: "https://movie.douban.com/photos/photo/2494292760/",
                        id: "2494292760",
                        icon: "https://img3.doubanio.com/view/photo/s/public/p2494292760.webp"
                    },
                    {
                        thumb: "https://img3.doubanio.com/view/photo/m/public/p2495183581.webp",
                        image: "https://img3.doubanio.com/view/photo/l/public/p2495183581.webp",
                        cover: "https://img3.doubanio.com/view/photo/sqs/public/p2495183581.webp",
                        alt: "https://movie.douban.com/photos/photo/2495183581/",
                        id: "2495183581",
                        icon: "https://img3.doubanio.com/view/photo/s/public/p2495183581.webp"
                    },
                    {
                        thumb: "https://img1.doubanio.com/view/photo/m/public/p2508709188.webp",
                        image: "https://img1.doubanio.com/view/photo/l/public/p2508709188.webp",
                        cover: "https://img1.doubanio.com/view/photo/sqs/public/p2508709188.webp",
                        alt: "https://movie.douban.com/photos/photo/2508709188/",
                        id: "2508709188",
                        icon: "https://img1.doubanio.com/view/photo/s/public/p2508709188.webp"
                    },
                    {
                        thumb: "https://img3.doubanio.com/view/photo/m/public/p2494525290.webp",
                        image: "https://img3.doubanio.com/view/photo/l/public/p2494525290.webp",
                        cover: "https://img3.doubanio.com/view/photo/sqs/public/p2494525290.webp",
                        alt: "https://movie.douban.com/photos/photo/2494525290/",
                        id: "2494525290",
                        icon: "https://img3.doubanio.com/view/photo/s/public/p2494525290.webp"
                    },
                    {
                        thumb: "https://img1.doubanio.com/view/photo/m/public/p2482932018.webp",
                        image: "https://img1.doubanio.com/view/photo/l/public/p2482932018.webp",
                        cover: "https://img1.doubanio.com/view/photo/sqs/public/p2482932018.webp",
                        alt: "https://movie.douban.com/photos/photo/2482932018/",
                        id: "2482932018",
                        icon: "https://img1.doubanio.com/view/photo/s/public/p2482932018.webp"
                    },
                    {
                        thumb: "https://img3.doubanio.com/view/photo/m/public/p2472776420.webp",
                        image: "https://img3.doubanio.com/view/photo/l/public/p2472776420.webp",
                        cover: "https://img3.doubanio.com/view/photo/sqs/public/p2472776420.webp",
                        alt: "https://movie.douban.com/photos/photo/2472776420/",
                        id: "2472776420",
                        icon: "https://img3.doubanio.com/view/photo/s/public/p2472776420.webp"
                    },
                    {
                        thumb: "https://img1.doubanio.com/view/photo/m/public/p2450289389.webp",
                        image: "https://img1.doubanio.com/view/photo/l/public/p2450289389.webp",
                        cover: "https://img1.doubanio.com/view/photo/sqs/public/p2450289389.webp",
                        alt: "https://movie.douban.com/photos/photo/2450289389/",
                        id: "2450289389",
                        icon: "https://img1.doubanio.com/view/photo/s/public/p2450289389.webp"
                    },
                    {
                        thumb: "https://img1.doubanio.com/view/photo/m/public/p2445494989.webp",
                        image: "https://img1.doubanio.com/view/photo/l/public/p2445494989.webp",
                        cover: "https://img1.doubanio.com/view/photo/sqs/public/p2445494989.webp",
                        alt: "https://movie.douban.com/photos/photo/2445494989/",
                        id: "2445494989",
                        icon: "https://img1.doubanio.com/view/photo/s/public/p2445494989.webp"
                    },
                    {
                        thumb: "https://img3.doubanio.com/view/photo/m/public/p2417113813.webp",
                        image: "https://img3.doubanio.com/view/photo/l/public/p2417113813.webp",
                        cover: "https://img3.doubanio.com/view/photo/sqs/public/p2417113813.webp",
                        alt: "https://movie.douban.com/photos/photo/2417113813/",
                        id: "2417113813",
                        icon: "https://img3.doubanio.com/view/photo/s/public/p2417113813.webp"
                    },
                    {
                        thumb: "https://img1.doubanio.com/view/photo/m/public/p2522214988.webp",
                        image: "https://img1.doubanio.com/view/photo/l/public/p2522214988.webp",
                        cover: "https://img1.doubanio.com/view/photo/sqs/public/p2522214988.webp",
                        alt: "https://movie.douban.com/photos/photo/2522214988/",
                        id: "2522214988",
                        icon: "https://img1.doubanio.com/view/photo/s/public/p2522214988.webp"
                    }
                ],
                summary: "由于一怒杀害了强拆牺牲战友房子的恶霸，屡立功勋的冷锋（吴京 饰）受到军事法庭的判决。在押期间，亲密爱人龙小云壮烈牺牲。出狱后，冷锋辗转来到非洲，他辗转各地，只为寻找杀害小云的凶手。在此期间，冷锋逗留的国家发生叛乱，叛徒红巾军大开杀戒，血流成河。中国派出海军执行撤侨任务，期间冷锋得知有一位陈博士被困在五十五公里外的医院，而叛军则试图抓住这位博士。而从另一位华侨（于谦 饰）口中得知，杀害小云的凶手正待在这个国家。 在无法得到海军支援的情况下，冷锋只身闯入硝烟四起的战场。不屈不挠的战狼，与冷酷无情的敌人展开悬殊之战……©豆瓣",
                clips: [ ],
                subtype: "movie",
                directors: [
                    {
                        avatars: {
                            small: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1549645325.74.webp",
                            large: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1549645325.74.webp",
                            medium: "https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1549645325.74.webp"
                        },
                        name_en: "Jing Wu",
                        name: "吴京",
                        alt: "https://movie.douban.com/celebrity/1000525/",
                        id: "1000525"
                    }
                ],
                comments_count: 226858,
                popular_reviews: [
                    {
                        rating: {
                            max: 5,
                            value: 3,
                            min: 0
                        },
                        title: "什么时候开始，中国电影经不起一点批评？",
                        subject_id: "26363254",
                        author: {
                            uid: "zhimaizhe",
                            avatar: "https://img3.doubanio.com/icon/u37424389-5.jpg",
                            signature: "电影之梦；只为感受，不为演绎。",
                            alt: "https://www.douban.com/people/zhimaizhe/",
                            id: "37424389",
                            name: "执麦者"
                        },
                        summary: "什么时候开始，中国电影经不起一点批评？ 文 | 执麦者 2017年7月31日 中国电影市场，是好，还是不好？ 截至到2017年8月6日实时票房，《战狼2》累计票房31.09亿，超越《美人鱼》在2016年创下的33.9亿的中国内地...",
                        alt: "https://movie.douban.com/review/8709677/",
                        id: "8709677"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 5,
                            min: 0
                        },
                        title: "美分的水军注定敌不过14亿人民群众的眼睛",
                        subject_id: "26363254",
                        author: {
                            uid: "143327665",
                            avatar: "https://img3.doubanio.com/icon/u143327665-2.jpg",
                            signature: "",
                            alt: "https://www.douban.com/people/143327665/",
                            id: "143327665",
                            name: "听风的歌"
                        },
                        summary: "电影的原型是2015年的也门撤侨事件 2015年也门危机，中国海军直接派出2艘054A护卫舰，开进也门亚丁港 由于当时港口外枪炮轰鸣，中国海军入港全部自主完成 中国驻当地使馆和全副武装的武警特勤在岸边保护中国侨民 ...",
                        alt: "https://movie.douban.com/review/8700481/",
                        id: "8700481"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 5,
                            min: 0
                        },
                        title: "如果把冷锋换成美国队长",
                        subject_id: "26363254",
                        author: {
                            uid: "72157044",
                            avatar: "https://img1.doubanio.com/icon/u72157044-8.jpg",
                            signature: "文章转载请私信",
                            alt: "https://www.douban.com/people/72157044/",
                            id: "72157044",
                            name: "冰箱"
                        },
                        summary: "史蒂夫罗杰斯因为初恋爱人佩姬卡特被九头蛇暗杀，现场发现一颗特殊子弹是由非洲国家瓦坎达的神秘金属制成，史蒂夫决定前往非洲寻找凶手。 途中遇到海盗袭击，史蒂夫靠惊人的体能和力量在水中干掉一个小分队并成功...",
                        alt: "https://movie.douban.com/review/8704296/",
                        id: "8704296"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 2,
                            min: 0
                        },
                        title: "只有真正爱国的人，才有勇气对战狼说“不行”",
                        subject_id: "26363254",
                        author: {
                            uid: "94332979",
                            avatar: "https://img3.doubanio.com/icon/u94332979-5.jpg",
                            signature: "不如我们从头来过",
                            alt: "https://www.douban.com/people/94332979/",
                            id: "94332979",
                            name: "我是尾号2473"
                        },
                        summary: "第一篇长评下面有很多人表达了疑惑、谩骂、支持。 https://movie.douban.com/review/8701257/（跳转） 以下，是我的回应。 不可否认的是，吴京通过战狼向观众传递的积极的价值观，以及它为激发每一位观众的民族自...",
                        alt: "https://movie.douban.com/review/8717953/",
                        id: "8717953"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 1,
                            min: 0
                        },
                        title: "聊一聊我看战狼2是从哪里开始尴尬的",
                        subject_id: "26363254",
                        author: {
                            uid: "77690194",
                            avatar: "https://img3.doubanio.com/icon/u77690194-4.jpg",
                            signature: "",
                            alt: "https://www.douban.com/people/77690194/",
                            id: "77690194",
                            name: "小小果实"
                        },
                        summary: "首先，在观影之前我对战狼2没有任何偏见，并且是有所期待的。 期待全都来自微博上铺天盖地的好评和朋友圈里晒电影票的自来水们的强烈推荐。 甚至战狼1我也是购票去影院支持的，1看完后直至今日，我不看简介回忆不...",
                        alt: "https://movie.douban.com/review/8715893/",
                        id: "8715893"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 5,
                            min: 0
                        },
                        title: "我来集中唠叨一下电影中所谓的“硬伤”",
                        subject_id: "26363254",
                        author: {
                            uid: "164397516",
                            avatar: "https://img3.doubanio.com/icon/u164397516-1.jpg",
                            signature: "",
                            alt: "https://www.douban.com/people/164397516/",
                            id: "164397516",
                            name: "0阳明子0"
                        },
                        summary: "最被大多数人诟病的莫过于冷锋用铁丝网接火箭弹的细节。 这个动作理论上是可行的。 铁栅栏防御RPG的原理就两个。 一是提前引爆弹头，削弱金属射流的威力；（这种往往应用在装甲外面） 二是当弹头命中栅栏缝隙时两...",
                        alt: "https://movie.douban.com/review/8705429/",
                        id: "8705429"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 4,
                            min: 0
                        },
                        title: "上映1天票房超2亿，真正的华语超级大片燃的不只是动作",
                        subject_id: "26363254",
                        author: {
                            uid: "busanmovie",
                            avatar: "https://img1.doubanio.com/icon/u134916477-8.jpg",
                            signature: "相聚有时，电影不散",
                            alt: "https://www.douban.com/people/busanmovie/",
                            id: "134916477",
                            name: "不散"
                        },
                        summary: "本文原创首发于不散微信公众号（ID:busan-movie），未经不散和作者授权禁止转载 作者 |谢谢你们的鱼 2015年，一部《战狼》在4月淡季席卷了超过5亿的票房成绩。就是这么一部辗转了好几个发行方、被很多明星拒演、...",
                        alt: "https://movie.douban.com/review/8702759/",
                        id: "8702759"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 2,
                            min: 0
                        },
                        title: "一次男性玛丽苏式的终极幻想",
                        subject_id: "26363254",
                        author: {
                            uid: "94332979",
                            avatar: "https://img3.doubanio.com/icon/u94332979-5.jpg",
                            signature: "不如我们从头来过",
                            alt: "https://www.douban.com/people/94332979/",
                            id: "94332979",
                            name: "我是尾号2473"
                        },
                        summary: "关于评论区那些问题的回应：https://movie.douban.com/review/8717953/ 战狼2是一部非常优秀的主旋律电影，不仅表现了中非之间的友好关系，讽刺了西方国家的冷血无情以及大美利坚政府的无能，弘扬了中国人民共和...",
                        alt: "https://movie.douban.com/review/8701257/",
                        id: "8701257"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 3,
                            min: 0
                        },
                        title: "我是交叉骨，今天给大家讲一讲我在非洲出差的故事",
                        subject_id: "26363254",
                        author: {
                            uid: "159818935",
                            avatar: "https://img3.doubanio.com/icon/u159818935-1.jpg",
                            signature: "",
                            alt: "https://www.douban.com/people/159818935/",
                            id: "159818935",
                            name: "yyz0328"
                        },
                        summary: "最近接到个活，去非洲给一个不知道什么将军当雇佣军，好给组织上赚点经费。想着非洲这种鸟不拉屎的地方，总没有罗杰斯那家伙来给我捣乱了，我就开开心心的去了。 事实证明，我错了。 刚到非洲，就有一个不知道什...",
                        alt: "https://movie.douban.com/review/8700631/",
                        id: "8700631"
                    },
                    {
                        rating: {
                            max: 5,
                            value: 5,
                            min: 0
                        },
                        title: "真实的战狼。有人说《战狼2》有些情节比较虚假但一位中国建筑的员工看完电影后却格外感慨。这是他的来信：",
                        subject_id: "26363254",
                        author: {
                            uid: "164624537",
                            avatar: "https://img3.doubanio.com/icon/u164624537-2.jpg",
                            signature: "",
                            alt: "https://www.douban.com/people/164624537/",
                            id: "164624537",
                            name: "苏轼"
                        },
                        summary: "2011年2月15号开始，利比亚班加西开始爆发反政府游行。2月18号，班加西的政府军反水，政府机构瘫痪，当地已经完全陷入无政府的混乱状态，警察不再维护秩序，罪犯逃狱。 我们的营地遭受了匪徒持枪洗劫，损失惨重，...",
                        alt: "https://movie.douban.com/review/8725913/",
                        id: "8725913"
                    }
                ],
                ratings_count: 633196,
                aka: [
                    "新战狼",
                    "新战死沙场",
                    "Wolf Warriors 2"
                ]

            }
        }
    }

    changeData = () => {

    };

    static navigationOptions = ({navigation}) => ({
        headerTitle: '电影',
        headerRight: <Button
                        title='分享'
                        onPress={() => alert('点击了分享')}
                    />,
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#2a362c',
            opacity: 1,
        }
    });

    componentDidMount() {
        // const {state:{param:{id}}} = this.props.navigation;
        let formData = new FormData();
        formData.append('apikey','0b2bdeda43b5688921839c8ecb20399b',);
        formData.append('city','北京');
        formData.append('client','something',);
        formData.append('udid','dddddddddddddddddddddd');

        // fetch(`${movieInfo}/${id}`,{
        fetch(moview,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    data: data,
                    ready: true,
                });
            })
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size = 'large'
                                   style={{marginTop: 100}}
                />
            </View>
        );
    }

    render() {
        const {
            title,
            year,
            countries,
            genres,
            summary,
            ratings_count,
            mainland_pubdate,
            durations,
            photos,
            images,
            casts,
            rating,
            popular_comments
        } = this.state.data;

        // if (!this.state.ready) {
        //     return this.renderLoadingView;
        // }

        return(
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.titleView}>
                    <Image
                        source={{uri:images.large}}
                        style={styles.titleImg}
                    />
                </View>

                <View style={{margin: 20,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <View style={styles.nameView}>
                        <Text style={{fontSize: 22, fontWeight: '600', marginBottom: 5}}>
                            {title}
                        </Text>
                        <Text style={styles.detailText}>{year}/{countries}/{genres}</Text>
                        <Text style={styles.detailText}>上映时间：{mainland_pubdate}({countries})</Text>
                        <Text style={styles.detailText}>片长：{durations}</Text>
                    </View>
                    <View style={styles.scoreView}>
                        <Text style={{marginTop: 10, color: 'gray'}}>豆瓣评分</Text>
                        <Text style={{marginTop: 10, fontSize: 20}}>{rating.average}</Text>
                        <Text style={{marginTop: 10, color: 'gray'}}>{ratings_count}人</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',
                    justifyContent: 'flex-start'}}>
                    <TouchableOpacity
                        onPress={() => alert('点击购买')}
                    >
                        <Text style={{marginTop: 20,
                            marginBottom: 20,
                            marginLeft: 10,
                            fontSize:18,
                            }}>选座购票</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginLeft: 10, marginRight: 10}}>
                    <Text style={{fontSize: 16, color: 'gray',alignSelf: 'flex-start'}}>简介</Text>
                    <Text style={{fontSize: 16, marginTop: 10}}
                          numberOfLines={this.state.num} >{summary}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        this.setState({isExpend: !this.state.isExpend, num: this.state.isExpend?4:0})
                    }}>
                        <Text style={{color: "#2CBA48", fontSize: 16}}>
                            {!this.state.isExpend&&'展开' || this.state.isExpend&&'收起'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginLeft: 10, marginRight: 10, marginTop: 40,}}>
                    <Text style={{fontSize: 16, color: 'gray',alignSelf: 'flex-start'}}>影人</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            casts.map((x, i) => {
                                return(
                                    <View style={styles.peopleView}>
                                        <Image style={styles.pepleImg}
                                               source={{uri:x.avatars.large}}
                                        />
                                        <Text style={{marginTop: 10}}
                                                numberOfLines={1}>
                                            {x.name}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>

                <ScrollableTabView
                    style={{marginTop: 30,}}
                    renderTabBar={() => <DefaultTabBar/>}
                    tabBarUnderlineStyle={{
                        backgroundColor: '#000',
                        height: 0.5,
                        width: '45%',
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                    tabBarBackgroundColor='#f3f3f3'
                    tabBarActiveTextColor='#000'
                    tabBarInactiveTextColor='#959595'
                    tabBarTextStyle={{fontSize: 15,textAlignVertical: 'center'}}
                    locked={false}
                    onChangeTab={(i) => this.changeData(i)}
                >
                    <View tabLabel='短评'>
                    {popular_comments.map((v,i)=>{
                        return(
                            <View
                                style={{marginTop:18,flexDirection:'row',paddingRight:20}}
                                key={i}>
                                <View>
                                    <Image source={{uri:v.author.avatar}} style={{marginLeft:10, width:40,height:40,borderRadius:20}} />
                                </View>

                                <View style={{marginLeft:10,flex:1}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{lineHeight:25}}>{v.author.name}</Text>
                                    </View>
                                    <Text style={{marginBottom:8,color:'#3B3B3B'}}>{v.content}</Text>
                                    <Text style={{marginTop:10, color:'#9b9b9b'}}>
                                        4天前
                                    </Text>
                                </View>

                                <View style={{position:'absolute',right:20,top:0}}>
                                    {/*//绝对布局*/}
                                    <Text style={{color:'#9B9B9B'}}>👍{v.useful_count}</Text>
                                </View>
                            </View>
                        )
                    })}
                    </View>
                    <View tabLabel='讨论区'>
                        {popular_comments.map((v,i)=>{
                            return(
                                <View
                                    style={{marginTop:18,flexDirection:'row',paddingRight:20}}
                                    key={i}>
                                    <View>
                                        <Image source={{uri:v.author.avatar}} style={{marginLeft:10, width:40,height:40,borderRadius:20}} />
                                    </View>

                                    <View style={{marginLeft:10,flex:1}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{lineHeight:25}}>{v.author.name}</Text>
                                        </View>
                                        <Text style={{marginBottom:8,color:'#3B3B3B'}}>{v.content}</Text>
                                        <Text style={{marginTop:10, color:'#9b9b9b'}}>
                                            4天前
                                        </Text>
                                    </View>

                                    <View style={{position:'absolute',right:20,top:0}}>
                                        <Text style={{color:'#9B9B9B'}}>👍{v.useful_count}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollableTabView>
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    titleView: {
        height: 220,
        justifyContent: 'center',
        backgroundColor: '#2A362C',
    },
    titleImg: {
        alignSelf: 'center',
        width: width/2,
        height: 190,
    },
    nameView: {
        flex:3,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    detailText: {
        marginTop: 5,
    },
    scoreView: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 90,
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderColor: 'gray',
        borderWidth: 0.2,
        backgroundColor: 'white',
        shadowColor: '#9b9b9b',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
    },
    peopleView: {
        width: 100,
        alignItems: 'center',
        flexDirection: 'column',

    },
    pepleImg: {
        width: 80,
        height: 140,
    },

});