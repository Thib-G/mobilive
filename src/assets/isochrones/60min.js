const coords = '50.6807605 5.6582352,50.6807012 5.6582449,50.6129829 5.6027346,50.6129683 5.6027056,50.6115616 5.5734163,50.6085717 5.5395777,50.6035159 5.486257,50.6035161 5.4862474,50.6159722 5.4005003,50.6034624 5.3474419,50.5692992 5.2933035,50.5687108 5.2926163,50.5687108 5.2926162,50.5160027 5.2307539,50.515994 5.2307365,50.5133811 5.2186934,50.5133804 5.2186885,50.5131055 5.2156548,50.4855866 5.1350073,50.4077377 5.121851,50.3400169 5.1642221,50.2901484 5.1979229,50.279954 5.2088036,50.2798848 5.2087749,50.2800446 5.2042183,50.2800447 5.2042171,50.2801099 5.2031967,50.28011 5.2031956,50.2806474 5.1974066,50.2800682 5.1724822,50.273586 5.0977825,50.2096702 5.0654626,50.1998439 5.0658098,50.1998131 5.0657427,50.2117448 5.0527807,50.2364514 4.9684908,50.2385174 4.9449009,50.238548 4.9448655,50.3001077 4.9303919,50.3528312 4.8919745,50.3906926 4.8013337,50.3902789 4.7741294,50.3866924 4.7411738,50.3705439 4.6957513,50.354027 4.6639304,50.3540236 4.6639214,50.3385698 4.6002927,50.3084899 4.5422481,50.3084871 4.5422413,50.2895081 4.4798669,50.2895064 4.4798568,50.2895011 4.4797187,50.2895015 4.4797113,50.3029473 4.3901611,50.3054964 4.3215824,50.3082084 4.2499311,50.3082101 4.2499209,50.3319024 4.1721808,50.3467656 4.074409,50.3467987 4.0673011,50.3277184 3.9745183,50.3277189 3.9745001,50.3507646 3.8861089,50.350773 3.8860929,50.363491 3.8713714,50.3992898 3.7863268,50.4043935 3.7524815,50.4043939 3.7524795,50.4124762 3.7127974,50.3994283 3.633274,50.3833333 3.6105904,50.3833473 3.6105319,50.3834227 3.6104924,50.383434 3.6104885,50.4057801 3.6063256,50.4058179 3.606339,50.4061189 3.6066931,50.4061194 3.6066937,50.4122041 3.6141682,50.5007711 3.6397972,50.5241839 3.6191712,50.532493 3.6075713,50.5325051 3.6075602,50.5924446 3.572101,50.6173311 3.550462,50.6250695 3.5380407,50.5972973 3.4478956,50.597296 3.4478777,50.5977992 3.4445966,50.5977993 3.4445959,50.5979033 3.4439925,50.5979034 3.443992,50.5996528 3.4345486,50.5996546 3.4345421,50.5998347 3.4340528,50.6195352 3.3403847,50.6196003 3.3403625,50.6351409 3.3536985,50.6351538 3.3537197,50.6504712 3.4187137,50.6556283 3.4265462,50.655633 3.426556,50.6584284 3.4352936,50.6958164 3.5140534,50.6958174 3.5140557,50.7029872 3.5319738,50.7977419 3.4995493,50.7968086 3.4484742,50.7968097 3.4484643,50.7984472 3.4415554,50.804803 3.3901137,50.8011557 3.3491147,50.7826018 3.2998648,50.7826012 3.2998631,50.7718129 3.2667709,50.7718111 3.2667623,50.7650248 3.1951381,50.7650246 3.1951335,50.7655122 3.1713716,50.7655675 3.1713354,50.8228687 3.1949808,50.8228872 3.1949964,50.8411906 3.2238766,50.8411966 3.223894,50.8456617 3.2686022,50.867911 3.3004589,50.8679138 3.3004636,50.8722628 3.308974,50.90827 3.3534004,50.9769541 3.3313143,50.9920105 3.2823462,50.9920325 3.2823214,51.0542347 3.2548668,51.0941351 3.1676553,51.0845891 3.1562805,51.0845997 3.1562202,51.190055 3.0953539,51.1933546 3.0755954,51.1934232 3.0755746,51.193793 3.0759671,51.1938039 3.0759954,51.1934275 3.0925935,51.213373 3.1898066,51.213373 3.1898223,51.2114448 3.1996003,51.2114415 3.1996102,51.2048244 3.213085,51.1728405 3.2834865,51.1708904 3.3390247,51.1802762 3.4282994,51.1971333 3.4535546,51.1971376 3.4535631,51.1998387 3.4609686,51.1998384 3.4609967,51.17242 3.5318947,51.1800739 3.5755964,51.1800745 3.5756044,51.1779569 3.6529309,51.2038515 3.7076414,51.2049231 3.7096291,51.2111955 3.7204534,51.2111957 3.7204537,51.2119905 3.7218508,51.2119918 3.7218533,51.212723 3.7233797,51.2127236 3.7233811,51.2248748 3.7514136,51.2248773 3.7514216,51.235809 3.8058712,51.2503388 3.8637903,51.25034 3.8637988,51.251773 3.912856,51.2684684 4.0020476,51.2692409 4.0036857,51.2748754 4.0155612,51.2922344 4.0448983,51.2922392 4.044911,51.2929612 4.0485821,51.2929619 4.0485872,51.2931074 4.0508233,51.3070741 4.0948723,51.3116238 4.1020686,51.3116257 4.102072,51.3186903 4.1160692,51.4197 4.1078655,51.4199731 4.1062425,51.4199731 4.1062422,51.420152 4.1052135,51.4201521 4.1052128,51.4202553 4.104677,51.4202555 4.1046761,51.4205973 4.1031127,51.4205975 4.1031119,51.420964 4.1015872,51.4209642 4.1015863,51.4215627 4.0993246,51.4215632 4.099323,51.4220547 4.0977315,51.4220548 4.0977311,51.4225123 4.0962979,51.4225127 4.0962968,51.4229029 4.0951886,51.4229029 4.0951884,51.4233136 4.0940433,51.4233141 4.094042,51.4239266 4.0925002,51.423927 4.0924993,51.4252596 4.0893715,51.4252596 4.0893715,51.4258343 4.0880267,51.4258345 4.0880262,51.4270259 4.0853322,51.427026 4.0853321,51.4278831 4.0834094,51.4278833 4.0834089,51.4285028 4.0820749,51.428503 4.0820744,51.4292712 4.0804731,51.4292713 4.0804729,51.4295756 4.0798472,51.429576 4.0798465,51.4305726 4.0779015,51.430573 4.0779007,51.4316748 4.0758562,51.43175 4.0758741,51.4343081 4.1684483,51.4352172 4.1725644,51.4361372 4.1765542,51.4361373 4.1765547,51.4364573 4.1780347,51.4364581 4.17804,51.4382606 4.2004048,51.4439468 4.2228225,51.4906385 4.285434,51.5429913 4.2939337,51.5437039 4.293988,51.5437069 4.2939884,51.5444804 4.2941063,51.5444856 4.2941074,51.5455959 4.2944327,51.5456213 4.2944871,51.54419 4.2977571,51.5129657 4.3713452,51.5095974 4.393837,51.5082931 4.403814,51.5082195 4.40383,51.503713 4.3966049,51.4215933 4.3615634,51.3878142 4.4555335,51.3880319 4.4559334,51.3880339 4.4559376,51.3882497 4.4564747,51.3882509 4.4564781,51.3883806 4.456909,51.3926173 4.4685128,51.3926176 4.4685136,51.3930112 4.4696655,51.3930115 4.4696666,51.3934949 4.47123,51.3934956 4.4712324,51.3936585 4.4719041,51.3936593 4.4719088,51.3939521 4.4743579,51.4007219 4.4992733,51.4109823 4.5340692,51.4231937 4.5716803,51.4231947 4.571684,51.4270694 4.5889694,51.4754588 4.6718246,51.5434588 4.7403404,51.5434669 4.740385,51.5286038 4.7734654,51.5285696 4.7734889,51.458965 4.7774756,51.3983809 4.7903384,51.3218909 4.8433682,51.3243456 4.8605296,51.324346 4.8605372,51.3217607 4.914551,51.3217606 4.9145515,51.319617 4.9496972,51.3196164 4.9497022,51.3172254 4.9624103,51.317225 4.962412,51.2967021 5.0500559,51.2966289 5.0500674,51.29096 5.0406593,51.2909575 5.0406543,51.2574709 4.9618087,51.2574694 4.9618046,51.2392259 4.9009466,51.1575674 4.9399815,51.1543288 4.9577896,51.152534 4.9744176,51.1525337 4.9744199,51.1524745 4.9747765,51.1524729 4.9747826,51.1523598 4.9751212,51.1523557 4.9751298,51.152315 4.9751945,51.1486677 4.9815718,51.1392538 5.0100465,51.131907 5.0782199,51.1320029 5.0799633,51.1320026 5.0799711,51.13187 5.0809159,51.13187 5.0809161,51.1317702 5.0815943,51.1303345 5.100133,51.1320201 5.141486,51.1320195 5.1414946,51.1159417 5.232262,51.1159475 5.2335456,51.115947 5.2335518,51.1112784 5.2642545,51.1112742 5.2642673,51.1092681 5.2680308,51.109268 5.268031,51.1011052 5.2831458,51.0805724 5.3789281,51.0805712 5.3789326,51.0674699 5.417292,51.0674495 5.4173151,51.0668433 5.4176104,51.0233603 5.4623085,51.0202987 5.5237706,51.0202975 5.5237784,51.0017185 5.5971343,51.0017105 5.59715,50.9590641 5.6485614,50.9589939 5.6485288,50.9596219 5.6450529,50.9600867 5.6420136,50.9606167 5.6374588,50.9608527 5.6349428,50.9611799 5.6314256,50.9616407 5.6264441,50.9518994 5.5592119,50.8582916 5.5239955,50.8582904 5.5239951,50.8277119 5.5113738,50.8277033 5.5113689,50.7548772 5.4570378,50.7106392 5.5163684,50.7289265 5.5810409,50.7289219 5.581073,50.6807605 5.6582352';

const polyCoords = coords.split(',')
  .map(latlon => latlon.split(' ')
    .map(coord => parseFloat(coord)));

export default polyCoords;