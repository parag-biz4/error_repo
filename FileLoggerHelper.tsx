import {FileLogger, LogLevel} from 'react-native-file-logger';

export enum Level {
  Debug,
  Info,
  Warning,
  Error,
}
export const initializeLogger=()=> {
  const logLevel = LogLevel?.Debug;
  FileLogger.configure({logLevel}).then(() =>
    console.log('File-logger configured====', process.env.NODE_ENV, logLevel),
  );
}

export const showLogFilePaths = async () => {
  return (await FileLogger.getLogFilePaths()).join('\n');
};

export const toggleConsoleCapture=(value: any)=>{
  if (value) {
    FileLogger.enableConsoleCapture();
    console.log('Log Enabled....');
  } else {
    FileLogger.disableConsoleCapture();
    console.log('Log disabled....2');
  }
}

export const changeLogLevel=(logLevel: number) =>{
  const nextLogLevel = (logLevel + 1) % 4;
  FileLogger.setLogLevel(nextLogLevel);
  return nextLogLevel;
}

export const sendLogFilesByEmail=() =>{
  FileLogger.sendLogFilesByEmail({
    to: 'john@example.com',
    subject: 'Log files',
    body: 'Please find attached the log files from your app',
  });
}

export const setInitialLogLevel=() =>{
  FileLogger.setLogLevel(LogLevel.Debug);
}

export const deleteLogFiles = async () => {
  FileLogger.deleteLogFiles();
};

export const getCurrentLogLevel=(logLevel:number) =>{
  return LogLevel[logLevel];
}
