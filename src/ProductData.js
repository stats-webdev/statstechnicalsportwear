// ProductData.js
const prod1 = [
    {
      ID: '1',
      Name: 'ACTIVE TEE V2',
      Price: '1099',
      Description: 'Drop down shoulder stitch for a secure fit up top, and angled side slits for better mobility. Made with super lightweight, soft, moisture-wicking Durasoft fabric.',
      Colors: {
        GRAPHITE: { XS: 10, S: 5, M: 1, L:0,  XL: 3, '2XL': 4 ,'3XL': 0}, // stock added
        GHOST: { XS: 10, S: 0, M: 0, L:0,  XL: 3, '2XL': 0 ,'3XL': 1},
        OBSIDIAN: { XS: 10, S: 0, M: 0, L:0,  XL: 0, '2XL': 4 ,'3XL': 0},
        'DARK EARTH': { XS: 4, S: 6, M: 2, L: 1, XL: 5, '2XL': 7, '3XL': 0},
        BUTTER: { XS: 1, S: 4, M: 3, L: 2, XL: 5, '2XL': 8, '3XL': 0},
        REEF: { XS: 5, S: 7, M: 4, L: 9, XL: 3, '2XL': 6, '3XL': 0},
        'DEEP TAUPE': { XS: 1, S: 3, M: 2, XL: 1, '2XL': 1, '3XL': 0 },
        'SLATE GRAY': { XS: 2, S: 6, M: 4, XL: 3, '2XL': 1, '3XL': 0},
        TRENCH: { XS: 6, S: 1, M: 7, L: 5, XL: 4, '2XL': 3, '3XL': 0 },
      },
      Images: {
        GRAPHITE: "/Men's/Active Tee V2/Copy of Men's Active Tee V2 Graphite (2).png",
        GHOST: "/Men's/Active Tee V2/GHOST.png",
        OBSIDIAN: "/Men's/Active Tee V2/Obsidian.png",
        "DARK EARTH": "/Men's/Active Tee V2/DarkEarth.png",
        BUTTER: "/Men's/Active Tee V2/Butter.png",
        REEF: "/Men's/Active Tee V2/Reef.png",
        "DEEP TAUPE": "/Men's/Active Tee V2/DeepTaupe.png",
        "SLATE GRAY": "/Men's/Active Tee V2/SlateGray.png",
        TRENCH: "/Men's/Active Tee V2/Trench.png",
      },
      Thumbnail:{
        GRAPHITE: ["/Men's/Active Tee V2/Copy of Men's Active Tee V2 Graphite (2).png","/Men's/Active Tee V2/Copy of Men's Active Tee V2 Graphite (2).png" ],
        GHOST: ["/Men's/Active Tee V2/Copy of Men's Active Tee V2 Graphite (2).png","/Men's/Active Tee V2/Copy of Men's Active Tee V2 Graphite (2).png", "/Men's/Active Tee V2/GHOST.png" ],
        BUTTER:[
          "https://imagizer.imageshack.com/img924/1557/Xd0lUh.jpg",
          "https://imagizer.imageshack.com/img923/7382/gLXWHI.jpg",
          "https://imagizer.imageshack.com/img922/3235/K8H5vq.jpg",
          "https://imagizer.imageshack.com/img924/5395/sdKkJD.jpg",
          "https://imagizer.imageshack.com/img924/5255/2WM898.jpg",
          "https://imagizer.imageshack.com/img922/5169/ssCY96.jpg",
          "https://imagizer.imageshack.com/img923/2150/tBaf0w.jpg",
        ],
        REEF:[
          "https://imagizer.imageshack.com/img923/5751/xkVWXV.jpg",
          "https://imagizer.imageshack.com/img924/686/v2n87e.jpg",
          "https://imagizer.imageshack.com/img922/8955/XrFuOA.jpg",
          "https://imagizer.imageshack.com/img924/8843/ejB7RF.jpg",
          "https://imagizer.imageshack.com/img923/55/438CVm.jpg",
          "https://imagizer.imageshack.com/img922/3103/5z18o3.jpg",
          "https://imagizer.imageshack.com/img922/2986/csW4D9.jpg",
        ],
        "DARK EARTH":[
          "https://imagizer.imageshack.com/img922/6057/auJVL1.jpg",
          "https://imagizer.imageshack.com/img923/5708/cuekUO.jpg",
          "https://imagizer.imageshack.com/img922/3581/0GddLY.jpg",
          "https://imagizer.imageshack.com/img924/9688/I6CLz7.jpg",
          "https://imagizer.imageshack.com/img923/5443/DvwV3P.jpg",
          "https://imagizer.imageshack.com/img922/1526/FoN57P.jpg",
          "https://imagizer.imageshack.com/img923/4534/E7r8OT.jpg",
        ],
        TRENCH:[
          "https://imagizer.imageshack.com/img924/633/jDMT1C.jpg",
          "https://imagizer.imageshack.com/img922/6933/rvp6jB.jpg",
          "https://imagizer.imageshack.com/img923/4466/eccFwV.jpg",
          "https://imagizer.imageshack.com/img923/289/b2qY1g.jpg",
          "https://imagizer.imageshack.com/img922/4904/F7ZQQq.jpg",
          "https://imagizer.imageshack.com/img924/4950/VhqDFG.jpg",
          "https://imagizer.imageshack.com/img924/8851/0JLsDp.jpg"
        ]
      },
      PriceCard: "/Men's/Active Tee V2/Price Card/2024_Price Card - Durasoft Active Tee V2 - All Colors.jpg"
    },
    {
      ID: '2',
      Name: 'ACTIVE TANK TOP V2',
      Price: '999',
      Description: 'A breathable tank top designed for high-performance activities.',
      Colors: {
        GRAPHITE: ['XS', 'S', 'M', 'L', 'XL'],
        GHOST: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      },
      Images: {
        GRAPHITE: "/Men's/Active Tank Top V2/Graphite.png",
        GHOST: "/Men's/Active Tank Top V2/Ghost.png"
      },
      Thumbnail:{
        GRAPHITE: ["/Men's/Active Tank Top V2/Graphite.png","/Men's/Active Tee V2/Copy of Men's Active Tee V2 Graphite (2).png" ],
        GHOST: ["/Men's/Active Tee V2/Copy of Men's Active Tee V2 Graphite (2).png","/Men's/Active Tee V2/Copy of Men's Active Tee V2 Graphite (2).png", "/Men's/Active Tee V2/GHOST.png" ]
      },
      PriceCard: "/Men's/Active Tee V2/Price Card/Active Tank Top Price Card.jpg"
    },
    {
      ID: '3',
      Name: 'HOODED TANK TOP V2',
      Price: '999',
      Description: 'A cozy hooded tank top with a perfect blend of comfort and style.',
      Colors: {
        GRAPHITE:{ XS: 6, S: 1, M: 7, L: 5, XL: 4, '2XL': 3, '3XL': 0 }
      },
      Images: {
        GRAPHITE:'https://imagizer.imageshack.com/img924/3939/ez5lrg.png'
      },
      Thumbnail:{
        GRAPHITE: ['https://imagizer.imageshack.com/img924/3939/ez5lrg.png'],
      },
      PriceCard: 'https://imagizer.imageshack.com/img924/9305/TVt60h.jpg'
    },
    
  ];
  
  export default prod1;
  