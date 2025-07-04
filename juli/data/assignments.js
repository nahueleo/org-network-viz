// Asignaciones persona-proyecto-rol
// Formato: { personId, projectId, roleId }
export const assignments = [
  { personId: 1, projectId: 1, roleId: 1 }, // Deepti Varghese, State Farm Core, PRODUCT OWNER
  { personId: 2, projectId: 1, roleId: 2 }, // Shayistha Abdulla, State Farm Core, BUSINESS ANALYST
  { personId: 3, projectId: 1, roleId: 3 }, // Wilbur Li, State Farm Core, SCRUM MASTER
  { personId: 4, projectId: 1, roleId: 4 }, // Mario B V, State Farm Core, DEV DIRECTOR
  { personId: 5, projectId: 1, roleId: 5 }, // Jimi Cui, State Farm Core, DEV LEAD
  { personId: 6, projectId: 1, roleId: 6 }, // Kohila Thangathurai, State Farm Core, QA LEAD
  { personId: 7, projectId: 1, roleId: 7 }, // Sergey Turivnenko, State Farm Core, DEVELOPER
  { personId: 8, projectId: 1, roleId: 7 }, // Akshata Pattewar, State Farm Core, DEVELOPER
  { personId: 9, projectId: 1, roleId: 7 }, // Alex Husniddinov, State Farm Core, DEVELOPER
  { personId: 10, projectId: 1, roleId: 8 }, // Parvathy Urmila, State Farm Core, QA
  { personId: 11, projectId: 1, roleId: 8 }, // Sheby Paul, State Farm Core, QA
  { personId: 1, projectId: 2, roleId: 1 }, // Deepti Varghese, SF Content Services, PRODUCT OWNER
  { personId: 2, projectId: 2, roleId: 2 }, // Shayistha Abdulla, SF Content Services, BUSINESS ANALYST
  { personId: 3, projectId: 2, roleId: 3 }, // Wilbur Li, SF Content Services, SCRUM MASTER
  { personId: 4, projectId: 2, roleId: 4 }, // Mario B V, SF Content Services, DEV DIRECTOR
  { personId: 6, projectId: 2, roleId: 6 }, // Kohila Thangathurai, SF Content Services, QA LEAD
  { personId: 12, projectId: 2, roleId: 7 }, // Jacky Lai, SF Content Services, DEVELOPER
  { personId: 13, projectId: 2, roleId: 7 }, // Diego Gygy, SF Content Services, DEVELOPER
  { personId: 14, projectId: 2, roleId: 7 }, // Enzo Baldoceda, SF Content Services, DEVELOPER
  { personId: 15, projectId: 2, roleId: 8 }, // Evelyn Xiong, SF Content Services, QA
  { personId: 16, projectId: 3, roleId: 1 }, // Ashley Britton, DTC, PRODUCT OWNER
  { personId: 17, projectId: 3, roleId: 3 }, // Juan Ignacio Pascual, DTC, SCRUM MASTER
  { personId: 18, projectId: 3, roleId: 4 }, // Andrew Krech, DTC, DEV DIRECTOR
  { personId: 19, projectId: 3, roleId: 5 }, // Jibran Javed, DTC, DEV LEAD
  { personId: 20, projectId: 3, roleId: 6 }, // Sajith Pillai, DTC, QA LEAD
  { personId: 21, projectId: 3, roleId: 7 }, // Divya Muthyala, DTC, DEVELOPER
  { personId: 22, projectId: 3, roleId: 7 }, // Sakib Bin-Sharif, DTC, DEVELOPER
  { personId: 23, projectId: 3, roleId: 7 }, // Yousef Emdadi, DTC, DEVELOPER
  { personId: 24, projectId: 3, roleId: 7 }, // Randl Morales, DTC, DEVELOPER
  { personId: 25, projectId: 3, roleId: 7 }, // Hossam Yassin, DTC, DEVELOPER
  { personId: 26, projectId: 3, roleId: 8 }, // Sachin Ajithkumar, DTC, QA
  { personId: 27, projectId: 4, roleId: 1 }, // Melissa Rahim, Swoop + LPAD, PRODUCT OWNER
  { personId: 17, projectId: 4, roleId: 3 }, // Juan Ignacio Pascual, Swoop + LPAD, SCRUM MASTER
  { personId: 28, projectId: 4, roleId: 4 }, // Billy Boileau, Swoop + LPAD, DEV DIRECTOR
  { personId: 29, projectId: 4, roleId: 5 }, // Mykyta Stenko, Swoop + LPAD, DEV LEAD
  { personId: 20, projectId: 4, roleId: 6 }, // Sajith Pillai, Swoop + LPAD, QA LEAD
  { personId: 30, projectId: 4, roleId: 7 }, // Javier Herrera, Swoop + LPAD, DEVELOPER
  { personId: 31, projectId: 4, roleId: 7 }, // Johanny Novas, Swoop + LPAD, DEVELOPER
  { personId: 32, projectId: 4, roleId: 7 }, // Yunior Laureano, Swoop + LPAD, DEVELOPER
  { personId: 33, projectId: 4, roleId: 7 }, // Gopakumar Vadukkoot, Swoop + LPAD, DEVELOPER
  { personId: 34, projectId: 4, roleId: 8 }, // Sreejith Sreekantan, Swoop + LPAD, QA
  { personId: 35, projectId: 5, roleId: 1 }, // Brian Elston, LDM / ETL, PRODUCT OWNER
  { personId: 36, projectId: 5, roleId: 3 }, // Sadhish Gopinathan, LDM / ETL, SCRUM MASTER
  { personId: 37, projectId: 5, roleId: 4 }, // Jason Chen, LDM / ETL, DEV DIRECTOR
  { personId: 38, projectId: 5, roleId: 5 }, // Maksym Lavrov, LDM / ETL, DEV LEAD
  { personId: 39, projectId: 5, roleId: 6 }, // Jennifer Mann, LDM / ETL, QA LEAD
  { personId: 40, projectId: 5, roleId: 7 }, // Sadique Puthukudi, LDM / ETL, DEVELOPER
  { personId: 41, projectId: 5, roleId: 7 }, // Emmanuel Mathew, LDM / ETL, DEVELOPER
  { personId: 42, projectId: 5, roleId: 7 }, // Felix Marte, LDM / ETL, DEVELOPER
  { personId: 43, projectId: 5, roleId: 7 }, // Christian Vizacaino, LDM / ETL, DEVELOPER
  { personId: 44, projectId: 5, roleId: 7 }, // Sergio Flores, LDM / ETL, DEVELOPER
  { personId: 45, projectId: 5, roleId: 8 }, // Hema Kunhikannan, LDM / ETL, QA
  { personId: 46, projectId: 5, roleId: 8 }, // Akhila Mathew, LDM / ETL, QA
  { personId: 47, projectId: 6, roleId: 1 }, // Barry Synard, TSEE, PRODUCT OWNER
  { personId: 48, projectId: 6, roleId: 3 }, // Julieta Sandrone, TSEE, SCRUM MASTER
  { personId: 18, projectId: 6, roleId: 4 }, // Andrew Krech, TSEE, DEV DIRECTOR
  { personId: 49, projectId: 6, roleId: 5 }, // Arman Yaghini, TSEE, DEV LEAD
  { personId: 39, projectId: 6, roleId: 6 }, // Jennifer Mann, TSEE, QA LEAD
  { personId: 50, projectId: 6, roleId: 7 }, // Rahul Moni, TSEE, DEVELOPER
  { personId: 51, projectId: 6, roleId: 7 }, // Sachin Manikantan, TSEE, DEVELOPER
  { personId: 52, projectId: 6, roleId: 7 }, // Mohammad Soltani, TSEE, DEVELOPER
  { personId: 53, projectId: 6, roleId: 7 }, // Alexander Acevedo, TSEE, DEVELOPER
  { personId: 54, projectId: 6, roleId: 8 }, // Rahul Vellor, TSEE, QA
  { personId: 55, projectId: 6, roleId: 8 }, // Maria Siby, TSEE, QA
  { personId: 56, projectId: 6, roleId: 9 }, // Joseph Pietrzak, TSEE, UX/UI
  { personId: 57, projectId: 6, roleId: 9 }, // Maddie Clark, TSEE, UX/UI
  { personId: 58, projectId: 7, roleId: 1 }, // Deanna Rebellato, Reviews, PRODUCT OWNER
  { personId: 36, projectId: 7, roleId: 3 }, // Sadhish Gopinathan, Reviews, SCRUM MASTER
  { personId: 18, projectId: 7, roleId: 4 }, // Andrew Krech, Reviews, DEV DIRECTOR
  { personId: 59, projectId: 7, roleId: 5 }, // Krishna Mamidi, Reviews, DEV LEAD
  { personId: 60, projectId: 7, roleId: 6 }, // Deepti Sharma, Reviews, QA LEAD
  { personId: 61, projectId: 7, roleId: 7 }, // Kevin Taie, Reviews, DEVELOPER
  { personId: 62, projectId: 7, roleId: 7 }, // Harry Guang, Reviews, DEVELOPER
  { personId: 63, projectId: 7, roleId: 8 }, // Aarcha Lekha, Reviews, QA
  { personId: 64, projectId: 8, roleId: 1 }, // Hankush Varma, Content Hub + Google, PRODUCT OWNER
  { personId: 48, projectId: 8, roleId: 3 }, // Julieta Sandrone, Content Hub + Google, SCRUM MASTER
  { personId: 28, projectId: 8, roleId: 4 }, // Billy Boileau, Content Hub + Google, DEV DIRECTOR
  { personId: 65, projectId: 8, roleId: 6 }, // Nanditha Varma, Content Hub + Google, QA LEAD
  { personId: 66, projectId: 8, roleId: 7 }, // Daniel Zemo, Content Hub + Google, DEVELOPER
  { personId: 67, projectId: 8, roleId: 7 }, // Sarath Sasidharan, Content Hub + Google, DEVELOPER
  { personId: 68, projectId: 8, roleId: 7 }, // Juliana De Carvalho, Content Hub + Google, DEVELOPER
  { personId: 69, projectId: 8, roleId: 7 }, // Jeff Lai, Content Hub + Google, DEVELOPER
  { personId: 70, projectId: 8, roleId: 7 }, // Rahul Menon, Content Hub + Google, DEVELOPER
  { personId: 47, projectId: 9, roleId: 1 }, // Barry Synard, ESM, PRODUCT OWNER
  { personId: 36, projectId: 9, roleId: 3 }, // Sadhish Gopinathan, ESM, SCRUM MASTER
  { personId: 28, projectId: 9, roleId: 4 }, // Billy Boileau, ESM, DEV DIRECTOR
  { personId: 65, projectId: 9, roleId: 6 }, // Nanditha Varma, ESM, QA LEAD
  { personId: 71, projectId: 9, roleId: 7 }, // Zbigniew Kucharczyk, ESM, DEVELOPER
  { personId: 72, projectId: 9, roleId: 7 }, // Felix Allende, ESM, DEVELOPER
  { personId: 73, projectId: 9, roleId: 7 }, // Jorge Alvarez, ESM, DEVELOPER
  { personId: 74, projectId: 9, roleId: 8 }, // Lekshmi Soman, ESM, QA
  { personId: 75, projectId: 9, roleId: 8 }, // Jasna Habeeb, ESM, QA
  { personId: 64, projectId: 10, roleId: 1 }, // Hankush Varma, Frontend, PRODUCT OWNER
  { personId: 47, projectId: 10, roleId: 1 }, // Barry Synard, Frontend, PRODUCT OWNER
  { personId: 58, projectId: 10, roleId: 1 }, // Deanna Rebellato, Frontend, PRODUCT OWNER
  { personId: 76, projectId: 10, roleId: 3 }, // Bruno Fasoli, Frontend, SCRUM MASTER
  { personId: 28, projectId: 10, roleId: 4 }, // Billy Boileau, Frontend, DEV DIRECTOR
  { personId: 49, projectId: 10, roleId: 5 }, // Arman Yaghini, Frontend, DEV LEAD
  { personId: 77, projectId: 10, roleId: 7 }, // Suresh Jaganath, Frontend, DEVELOPER
  { personId: 78, projectId: 10, roleId: 7 }, // Luis Isaia, Frontend, DEVELOPER
  { personId: 79, projectId: 10, roleId: 7 }, // Manoj Ponugoti, Frontend, DEVELOPER
  { personId: 80, projectId: 10, roleId: 7 }, // Winnie Chang, Frontend, DEVELOPER
  { personId: 81, projectId: 11, roleId: 1 }, // Theresa Z., Maintenance + PG, PRODUCT OWNER
  { personId: 82, projectId: 11, roleId: 1 }, // Mohit A., Maintenance + PG, PRODUCT OWNER
  { personId: 3, projectId: 11, roleId: 3 }, // Wilbur Li, Maintenance + PG, SCRUM MASTER
  { personId: 37, projectId: 11, roleId: 4 }, // Jason Chen, Maintenance + PG, DEV DIRECTOR
  { personId: 83, projectId: 11, roleId: 5 }, // Bill Li, Maintenance + PG, DEV LEAD
  { personId: 65, projectId: 11, roleId: 6 }, // Nanditha Varma, Maintenance + PG, QA LEAD
  { personId: 84, projectId: 11, roleId: 7 }, // Benjamin Han [legacy], Maintenance + PG, DEVELOPER
  { personId: 85, projectId: 11, roleId: 7 }, // Sergei Shubin [PG], Maintenance + PG, DEVELOPER
  { personId: 86, projectId: 11, roleId: 7 }, // Sikha S Kumar [Ent Int], Maintenance + PG, DEVELOPER
  { personId: 87, projectId: 11, roleId: 7 }, // Nidhin Remanan [Ent Int], Maintenance + PG, DEVELOPER
  { personId: 88, projectId: 11, roleId: 8 }, // Aswathi Sailaja, Maintenance + PG, QA
  { personId: 89, projectId: 11, roleId: 8 }, // Kohila Thangathurai [SF COOL], Maintenance + PG, QA
  { personId: 90, projectId: 11, roleId: 8 }, // Hashif Habeeb [LKP], Maintenance + PG, QA
  { personId: 91, projectId: 11, roleId: 2 }, // Sohail Mohammed [workday], Maintenance + PG, BUSINESS ANALYST
  { personId: 92, projectId: 12, roleId: 1 }, // Tamanna Prashar, Iris Plat, PRODUCT OWNER
  { personId: 93, projectId: 12, roleId: 1 }, // Femi Akinrotimi, Iris Plat, PRODUCT OWNER
  { personId: 94, projectId: 12, roleId: 2 }, // Victor Aransiola, Iris Plat, BUSINESS ANALYST
  { personId: 82, projectId: 12, roleId: 2 }, // Mohit A., Iris Plat, BUSINESS ANALYST
  { personId: 76, projectId: 12, roleId: 3 }, // Bruno Fasoli, Iris Plat, SCRUM MASTER
  { personId: 110, projectId: 12, roleId: 4 }, // Dave Elston, Iris Plat, DEV DIRECTOR
  { personId: 95, projectId: 12, roleId: 5 }, // Julien Rosen, Iris Plat, DEV LEAD
  { personId: 39, projectId: 12, roleId: 6 }, // Jennifer Mann, Iris Plat, QA LEAD
  { personId: 96, projectId: 12, roleId: 7 }, // Billy Chan [F], Iris Plat, DEVELOPER
  { personId: 97, projectId: 12, roleId: 7 }, // Pablo Amico [F], Iris Plat, DEVELOPER
  { personId: 98, projectId: 12, roleId: 7 }, // Adam Li [F], Iris Plat, DEVELOPER
  { personId: 99, projectId: 12, roleId: 7 }, // Jose Vilomar [B], Iris Plat, DEVELOPER
  { personId: 100, projectId: 12, roleId: 7 }, // Kashif Ahmad [B], Iris Plat, DEVELOPER
  { personId: 101, projectId: 12, roleId: 7 }, // Sevann Triztan [B], Iris Plat, DEVELOPER
  { personId: 102, projectId: 12, roleId: 7 }, // Saydenier Palacios [B], Iris Plat, DEVELOPER
  { personId: 103, projectId: 12, roleId: 8 }, // Prachi Mohanty, Iris Plat, QA
  { personId: 104, projectId: 12, roleId: 8 }, // Nimmy Nathan, Iris Plat, QA
  { personId: 105, projectId: 12, roleId: 9 }, // Joseph Pietrzak [UI/UX], Iris Plat, UX/UI
  { personId: 106, projectId: 12, roleId: 9 }, // Maddie Clark [UI/UX], Iris Plat, UX/UI
  { personId: 107, projectId: 12, roleId: 10 }, // Haotian (Robert) Liu [AI/Prompt], Iris Plat, AI
  { personId: 108, projectId: 12, roleId: 11 }, // Ayodeji Folayan [Data Eng], Iris Plat, DATA ENG
  { personId: 109, projectId: 12, roleId: 11 }, // Corey Theiss [Data Eng], Iris Plat, DATA ENG
  { personId: 110, projectId: 13, roleId: 4 }, // Dave Elston, Iris Front, DEV DIRECTOR
  { personId: 95, projectId: 13, roleId: 5 }, // Julien Rosen, Iris Front, DEV LEAD
  { personId: 39, projectId: 13, roleId: 6 }, // Jennifer Mann, Iris Front, QA LEAD
  { personId: 111, projectId: 14, roleId: 1 }, // Chris Bamford, AI, PRODUCT OWNER
  { personId: 17, projectId: 14, roleId: 3 }, // Juan Ignacio Pascual, AI, SCRUM MASTER
  { personId: 37, projectId: 14, roleId: 4 }, // Jason Chen, AI, DEV DIRECTOR
  { personId: 112, projectId: 14, roleId: 6 }, // Sudar Muthusamy, AI, QA LEAD
  { personId: 113, projectId: 14, roleId: 7 }, // Kevin Rivas, AI, DEVELOPER
  { personId: 114, projectId: 14, roleId: 7 }, // Franklin Frias, AI, DEVELOPER
  { personId: 115, projectId: 14, roleId: 7 }, // Hashif Habeeb, AI, DEVELOPER
  { personId: 116, projectId: 14, roleId: 8 }, // Allen Mathew, AI, QA
]; 