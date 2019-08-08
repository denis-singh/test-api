node {

    APP_TYPE = "test-api"

    // Check out the repository
    stage('Checkout') {
        checkout scm
    }

//    stage('Install Node Dependency') {
//        env.PATH = "/usr/local/lib/npm/bin/:${env.PATH}"
//        sh "npm install"
//    }
//

    if ("${BRANCH_NAME}" == "develop") {
        stage('Release to test environment') {
            withCredentials([usernamePassword(credentialsId: 'apigee-creds', passwordVariable: 'pass', usernameVariable: 'user')]) {
                env = "test"
	        proxy = "test-api"
                org = "singhdenis-eval" 
	        url = "https://api.enterprise.apigee.com"
                sh "ls -l; pwd"
                sh "python deploy.py -n ${proxy} -u ${user}:${pass} -o ${org} -h ${url} -e ${env} -p / -d ../test-api_${BRANCH_NAME}"
            }

        }

    }

    if ("${BRANCH_NAME}" == "master") {
        stage('Release to prod environment') {
            withCredentials([usernamePassword(credentialsId: 'apigee-creds', passwordVariable: 'pass', usernameVariable: 'user')]) {
                env = "prod"
	        proxy = "test-api"
                org = "singhdenis-eval" 
	        url = "https://api.enterprise.apigee.com"
                sh "ls -l; pwd"
                sh "python deploy.py -n ${proxy} -u ${user}:${pass} -o ${org} -h ${url} -e ${env} -p / -d ../test-api_${BRANCH_NAME}"
            }
        }
    }
}
