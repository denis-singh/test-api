node {

    APP_TYPE = "test-api"

    // Check out the repository
    stage('Checkout') {
        checkout scm
        // Get branch and commit ID
        sh "git rev-parse --abbrev-ref HEAD > var_branch"
        // Get commit ID
        sh "git rev-parse HEAD | tail -c 8 > var_short_commit-id"
        // Stash branch name
        stash includes: "var_*", name: "var-stash"
        // Abort build if this is commit message has been done by gitflow
        result = sh (script: "git log -1 --pretty=%B | grep -i 'updating develop poms \\|updating poms for '", returnStatus: true)
        if (result == 0) {
            currentBuild.result = 'ABORTED'
            error('Aborting build because it is a gitflow commit')
        }
    }

    stage('Install Node Dependency') {
        env.PATH = "/usr/local/lib/npm/bin/:${env.PATH}"
        sh "npm install"
    }

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
