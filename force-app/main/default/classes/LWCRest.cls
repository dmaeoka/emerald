// HEALTHY ALIVE CHECK - GET
// https://anypoint.mulesoft.com/mocking/api/v1/links/602580e8-bcfa-48ea-8a74-dc3c62b524af/health/alive

// Tenants Verify Request - POST
// https://anypoint.mulesoft.com/mocking/api/v1/links/602580e8-bcfa-48ea-8a74-dc3c62b524af/tenants/verify

// Tenants Get Tenancies - GET
// https://anypoint.mulesoft.com/mocking/api/v1/links/602580e8-bcfa-48ea-8a74-dc3c62b524af/tenants/123456/tenancies

// TENANTS TENANCY DETAILS - GET
// https://anypoint.mulesoft.com/mocking/api/v1/links/602580e8-bcfa-48ea-8a74-dc3c62b524af/tenancies/1234

// Tenants Tenancy Account Charges - GET
// https://anypoint.mulesoft.com/mocking/api/v1/links/602580e8-bcfa-48ea-8a74-dc3c62b524af/tenancies/1234/accountCharges?year=2021

// Tenants Tenancy Transactions - GET
// https://anypoint.mulesoft.com/mocking/api/v1/links/602580e8-bcfa-48ea-8a74-dc3c62b524af/tenancies/1234/transactions?year=2021

// Tenants Tenancy Statements - GET
// https://anypoint.mulesoft.com/mocking/api/v1/links/602580e8-bcfa-48ea-8a74-dc3c62b524af/tenancies/1234/statements?year=2021

// Tenants Tenancy Direct Debits - GET
// https://anypoint.mulesoft.com/mocking/api/v1/links/602580e8-bcfa-48ea-8a74-dc3c62b524af/tenancies/1234/directDebits

public with sharing class LWCRest {

	public LWCRest() {}

	public String anypointRequest(string endpoint, string method) {
		String anypoint = 'https://anypoint.mulesoft.com/mocking/api/v1/links/602580e8-bcfa-48ea-8a74-dc3c62b524af';
		HttpRequest httpRequest = new HttpRequest();
		httpRequest.setEndpoint(anypoint + endpoint);
		httpRequest.setHeader('client_id', '1a3rfe496jfkms49402srr93');
		httpRequest.setHeader('client_secret', '7o9der492wklsmnxcvrt48f1');
		httpRequest.setMethod(method);
		String strResponse = null;

		try {
			Http http = new Http();
			HttpResponse httpResponse = http.send(httpRequest);
			if (httpResponse.getStatusCode() == 200 ) {
				strResponse = httpResponse.getBody();
			} else {
				throw new CalloutException(httpResponse.getBody());
			}
		} catch (Exception ex) {
			throw ex;
		}

		if(!String.isBlank(strResponse)) {
			return strResponse;
		}

		return null;
	}

	@AuraEnabled
	public static string healthAlive(){
		return new LWCRest().anypointRequest('/health/alive', 'GET');
	}

	@AuraEnabled
	public static string getTenancies() {
		String tenantId = [
			SELECT tenantId__c
			FROM User
			WHERE Id = :UserInfo.getUserId()
		][0].tenantId__c;

		return new LWCRest().anypointRequest('/tenants/' + tenantId + '/tenancies', 'GET');
	}

	@AuraEnabled
	public static string getName() {
		String tenantId = [
			SELECT tenantId__c
			FROM User
			WHERE Id = :UserInfo.getUserId()
		][0].tenantId__c;

		return UserInfo.getFirstName() + ' - ' + tenantId;
	}
}
