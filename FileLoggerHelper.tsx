import {FileLogger, LogLevel} from 'react-native-file-logger';

export declare enum Level {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
}
export function initializeFileLogger() {
  const logLevel = LogLevel.Debug;
  FileLogger.configure({logLevel}).then(() =>
    console.log('File-logger configured====', process.env.NODE_ENV, logLevel),
  );
}

export const showLogFilePaths = async () => {
  return (await FileLogger.getLogFilePaths()).join('\n');
};

export function changeEnabled(value) {
  if (value) {
    FileLogger.enableConsoleCapture();
  } else {
    FileLogger.disableConsoleCapture();
    console.log('log disabled');
  }
}

export function changeLogLevel(logLevel) {
  const nextLogLevel = (logLevel + 1) % 4;
  FileLogger.setLogLevel(nextLogLevel);
  return nextLogLevel;
}

export function sendLogFilesByEmail() {
  FileLogger.sendLogFilesByEmail({
    to: 'john@doe.com',
    subject: 'Log files',
    body: 'Please find attached the log files from your app',
  });
}

export function setInitilaLogLevel() {
  FileLogger.setLogLevel(LogLevel.Debug);
}

export const deleteLogFiles = async () => {
  FileLogger.deleteLogFiles();
};

export function getCurrentLogLevel(logLevel) {
  return LogLevel[logLevel];
}
