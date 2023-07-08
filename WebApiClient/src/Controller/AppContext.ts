import { PerfTimer } from "./PerfTimer";

export interface IAppContext
{
    log(message: string): void;
    logTimeout(message: string, msecVisible: number): void;
    logError(message: string, msecVisible: number): void;
    setLogMessageDelegate(addMessageDelegate: AddLogMessageDelegate): void;
}

export interface AddLogMessageDelegate
{
    (message: string, msecVisible: number): void;
}

export class AppContext
{
    m_addLogMessageDelegate: AddLogMessageDelegate = () => {};
    m_perfTimer: PerfTimer = new PerfTimer();

    get Timer(): PerfTimer { return this.m_perfTimer; }

    log(message: string, msecVisible: number = 0)
    {
        if (this.m_addLogMessageDelegate != null)
            this.m_addLogMessageDelegate(message, msecVisible);
    }

    logTimeout(message: string, msecVisible: number)
    {
        if (this.m_addLogMessageDelegate != null)
            this.m_addLogMessageDelegate(message, msecVisible);
    }

    logError(message: string, msecVisible: number = 0)
    {
        if (this.m_addLogMessageDelegate != null)
            this.m_addLogMessageDelegate(message, msecVisible);
    }

    setLogMessageDelegate(addMessageDelegate: AddLogMessageDelegate)
    {
        this.m_addLogMessageDelegate = addMessageDelegate;
    }
}