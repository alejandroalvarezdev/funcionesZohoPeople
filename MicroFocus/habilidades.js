contador2 = 0;
iterador2 = {0,1,2,3,4,5,6,7,8,9};
for each  j in iterador2
{
fromIndex2 = j * 200;
registrosHabilidades = zoho.people.getRecords("Habilidades",fromIndex2,200);
for each  registroHabilidad in registrosHabilidades
{
	if(registroHabilidad.get("message") != "No records found")
	{
		zohoId = registroHabilidad.get("Zoho_ID");
		response = invokeurl
		[
			url :"https://people.zoho.com/people/api/deleteRecords?recordIds=" + zohoId + "&formLinkName=Habilidades"
			type :POST
			connection:"peoplecustomfunction"
		];
		info response;
	}
}
}
contador = 0;
iterador = {0,1,2,3,4,5,6,7,8,9};
for each  i in iterador
{
fromIndex = i * 200;
empleados = zoho.people.getRecords("employee",fromIndex,200);
for each  empleado in empleados
{
	if(empleado.get("message") != "No records found")
	{
		userErecno = empleado.get("Zoho_ID");
		url = "https://people.zoho.com/people/api/performance/skills/getUserSkills";
		param_map = Map();
		param_map.put("userErecNo",userErecno);
		response = invokeurl
		[
			url :url
			type :GET
			parameters:param_map
			connection:"peoplecustomfunctionperformance"
		];
		lista = response.toList();
		for each  habilidades in lista
		{
			if(habilidades.get("code") != "Deleted")
			{
				info habilidades;
				usuariosConHabilidades = habilidades.get("response").get("result").get("skillsetList");
				if(usuariosConHabilidades != {})
				{
					for each  habilidad in usuariosConHabilidades
					{
						nombre = habilidad.get("employee.recordID");
						skill = habilidad.get("skillSetName");
						peso = habilidad.get("skillSetWeightage");
						nivel = habilidad.get("skillSetScore");
						skillSetId = habilidad.get("skillSetId");
						param_map2 = Map();
						param_map2.put("Empleado",nombre);
						param_map2.put("Peso",peso);
						param_map2.put("Nivel",nivel);
						param_map2.put("Habilidad",skill);
						param_map2.put("SkillSetId",skillSetId);
						createResponse = zoho.people.create("Habilidades",param_map2);
						info createResponse;
						// 						info param_map2;
					}
				}
			}
		}
	}
}
}