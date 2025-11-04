const fs = require('fs');
const path = require('path');

/**
 * Session utilities for managing shared test run IDs across parallel processes
 */
class SessionUtils {
    constructor() {
        this.sessionFilePath = path.join(process.cwd(), '.cat-session.json');
    }

    /**
     * Create a new session file with the given run ID and metadata
     * @param {string} runId - The CAT job ID
     * @param {object} metadata - Additional session metadata
     */
    createSession(runId, metadata = {}) {
        const sessionData = {
            runId,
            timestamp: new Date().toISOString(),
            processId: process.pid,
            parentProcessId: process.ppid,
            ...metadata
        };

        try {
            fs.writeFileSync(this.sessionFilePath, JSON.stringify(sessionData, null, 2));
            console.log(`Created session file with runId: ${runId}`);
            return sessionData;
        } catch (error) {
            console.error('Failed to create session file:', error);
            throw error;
        }
    }

    /**
     * Read the existing session file
     * @returns {object|null} Session data or null if not found
     */
    readSession() {
        try {
            if (fs.existsSync(this.sessionFilePath)) {
                const sessionData = JSON.parse(fs.readFileSync(this.sessionFilePath, 'utf8'));
                return sessionData;
            }
            return null;
        } catch (error) {
            console.error('Failed to read session file:', error);
            return null;
        }
    }

    /**
     * Get the run ID from the session file
     * @returns {string|null} Run ID or null if not found
     */
    getRunId() {
        const session = this.readSession();
        return session ? session.runId : null;
    }

    /**
     * Check if a session exists
     * @returns {boolean} True if session file exists and is valid
     */
    hasSession() {
        const session = this.readSession();
        return session && session.runId;
    }

    /**
     * Clean up the session file
     */
    cleanupSession() {
        try {
            if (fs.existsSync(this.sessionFilePath)) {
                fs.unlinkSync(this.sessionFilePath);
                console.log('Session file cleaned up');
            }
        } catch (error) {
            console.error('Failed to cleanup session file:', error);
        }
    }

    /**
     * Update session metadata
     * @param {object} updates - Updates to merge with existing session
     */
    updateSession(updates) {
        try {
            const session = this.readSession();
            if (session) {
                const updatedSession = { ...session, ...updates };
                fs.writeFileSync(this.sessionFilePath, JSON.stringify(updatedSession, null, 2));
                return updatedSession;
            }
            return null;
        } catch (error) {
            console.error('Failed to update session file:', error);
            return null;
        }
    }
}

module.exports = SessionUtils;