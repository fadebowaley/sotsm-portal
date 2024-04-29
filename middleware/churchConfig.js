
/*
This is the first step in creating a church Structure,
the Ranking must be well spelt-out with
system generated code on it
this ranking will guide us in forming any structure for the church or any Church
for Example:

Household:

ID        LEVELRANK       LABELNAME        CODE     STATUS     STATUSCODE      CODEFORMART       IDFKE  USER_ID

1           1             NATIONAL         NA        mainfold       1          NT218000000     78      2
2           2             DIVISION         DV        mainfold       1          DV218000000     78      2
3           2             REGION           RG        specialfold    2          RG218000000     78      2
4           3             DIOCESE          DO        mainfold       1          DO218000000     78      2
5           4             ZONE             ZN        mainfold       1          ZN218000000     78      2
6           5             PARISH           PR        specialfold    2          PR218000000     78      2

FaithTable
ID          LEVELRANK       LABELRANK          CODE         COUNT ++   LASTCODE            FK_STR    IDFKE
1            1              NATIONAL           NA           1          NT2183040001           1        78
2            2              DIVISION           DV           20         DV2183040020           2        78
3            3              DIOCESE            DO           45         DV2183040045           4        78
*/



/***
 * SETP 1 
 * SetUp YOUR Sturcture table Config (FOLD STRUCTURES CRUD)
 * 
 * SETP 2:   CREATE THE MAIN CHURCH  (CRUD)
 * Create the  National Parish
 * parish data (ALL PARISH DATA)
 * check structure and fill COUNT_MAIN -->loop pick national, loop others
 * GENERATE NATIONALCODE - STR.CODEFORMAT+GENRATED 
 * faithCode0                  faithFold0  -->       LEVELRANK_COUNT: // 5 updepth for national (parish - national)
 * STR.CODEFORMAT+GENRATED     STR.LABEL_+ CODE
 * example:
faithCode0      faithCode1      faithCode2      faithCode3      faithCode4
NT218000000     NT218000000     NT218000000     NT218000000     NT218000000

faithFold0        faithFold1        faithFold2        faithFold3        faithFold4
PARISH_CODE       ZONE_CODE         DIOCESE_CODE       DIVISION_CODE     NATIONAL_CODE
==>UPDATE DISTRIBUTION TABLE



STEP 3:
CREATE NEXT RANK   2 MAIN - AS MANY AS POSIBLE LEVEL_RANK 2 OF 5
 * parish data (ALL PARISH DATA) GET RANK 1 CODE, FILL RANK 
GENERATE CODE WITH STR.CODEFORMAT+GENRATED

 */