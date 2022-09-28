url1 = "https://people.zoho.com/people/api/performance/skills/getOrgSkills";
response = invokeurl
[
url :url1
type :GET
connection:"peoplecustomfunctionperformance"
];
habilidaddes = response.get("response").get("result").get("skills");
for each  habilidad in habilidaddes
{
skill = habilidad.get("skillsName");
url2 = "https://people.zoho.com/people/api/performance/skills/getusersbyskill";
param_map = Map();
param_map.put("skills",skill);
response2 = invokeurl
[
	url :url2
	type :GET
	parameters:param_map
	connection:"peoplecustomfunctionperformance"
];
usuariosDeEsaHabilidad = response2.get("response").get("result").get(skill);
if(usuariosDeEsaHabilidad != "No such skill")
{
	info usuariosDeEsaHabilidad ;
// 	for each  usuarioHabilidad in usuariosDeEsaHabilidad
// 	{
// 		userErecno = usuarioHabilidad.get("erecno");
// 		url3 = "https://people.zoho.com/people/api/performance/skills/getUserSkills";
// 		param_map = Map();
// 		param_map.put("userErecNo",userErecno);
// 		response3 = invokeurl
// 		[
// 			url :url3
// 			type :GET
// 			parameters:param_map
// 			connection:"peoplecustomfunctionperformance"
// 		];
// 		info response3;
// 	}
}
}
// contador = 0;
// iterador = {0,1,2,3,4,5,6,7,8,9};
// for each  i in iterador
// {
// fromIndex = i * 200;
// capacitaciones = zoho.people.getRecords("Capacitacion",fromIndex,200);
// for each  capacitacion in capacitaciones
// {
// 	if(capacitacion.get("message") != "No records found")
// 	{
// 	}
// }
// }