node {
    APP_TYPE = "test-api"
    stage('Install Node Dependency') {
        env.PATH = "/usr/local/lib/npm/bin/:${env.PATH}"
        sh "npm install"
    }

    if ("${BRANCH_NAME}" == "develop") {
        stage('Deploy to test environment') {
            node {
               env = "test"
	       proxy = "test-api"
               org = "singhdenis-eval" 
	       url = "https://api.enterprise.apigee.com"
               sh "./deploy.py -n ${proxy} -u xxxx -o ${org} -h ${url} -e ${env} -p / -d ../test-api"
            }
        }

    }

    if ("${BRANCH_NAME}" == "master") {
        stage('Deploy to prod environment') {
            node {
                env = "prod"
	        proxy = "test-api"
                org = "singhdenis-eval" 
	        url = "https://api.enterprise.apigee.com"
	    
                sh "./deploy.py -n ${proxy} -u xxxx -o ${org} -h ${url} -e ${env} -p / -d ../test-api"
            }
        }
    }
}
