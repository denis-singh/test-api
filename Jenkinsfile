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

    // Get branch and commit id
    unstash "var-stash"
    def short_commit_id = readFile('var_short_commit-id').trim()

    println "Git branch = ${BRANCH_NAME}, Git commit id: ${short_commit_id}"

    stage('Install Node Dependency') {
        env.PATH = "/usr/local/lib/npm/bin/:${env.PATH}"
        sh "npm install"
    }

}

if ("${BRANCH_NAME}" == "develop") {
    stage('Release to test environment') {
        node {
            ENV = "dev"

            // Get commit id
            unstash "var-stash"
            def short_commit_id = readFile('var_short_commit-id').trim()

        }
    }

}

if ("${BRANCH_NAME}" == "master") {
    stage('Release to PRD') {
        timeout(time: 30, unit: 'DAYS') {
            input message: 'Deploy release to PRD?',
                ok: 'Ok to deploy'
        }
        node {
            ENV = "prd"

            // Get commit id
            unstash "var-stash"
            def short_commit_id = readFile('var_short_commit-id').trim()


        }
    }
}
