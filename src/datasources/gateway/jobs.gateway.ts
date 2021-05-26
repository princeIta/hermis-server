import { Timezone } from 'tz-offset';

export interface IScheduleOptions {
  scheduled?: boolean;
  timezone?: Timezone;
}

export interface IScheduledTask {
  start: () => this;
  stop: () => this;
  destroy: () => void;
  getStatus: () => string;
}

export interface ICronProvider {
  schedule: (
    cronExpression: string,
    func: () => void,
    options?: IScheduleOptions
  ) => IScheduledTask;
  validate: (cronExpression: string) => boolean;
}

export interface IJob {
  jobId: string;
  scheduledAt: Date;
  cronSyntax: string;
  task: () => void;
}

interface IJobWithRef extends IJob {
  jobRef: IScheduledTask;
}

class Jobs {
  private _JOBS: Array<IJobWithRef> = [];
  private _jobProvider?: ICronProvider;

  set jobProvider(value: ICronProvider) {
    this._jobProvider = value;
  }

  protected _destroy(jobId: string): IJobWithRef | void {
    const jobIdx = this._JOBS.findIndex(
      (job) => job.jobId.toString() === jobId
    );
    if (jobIdx >= 0) {
      const deletedJob = this._JOBS.splice(jobIdx, 1).pop();
      deletedJob?.jobRef.destroy();
      return deletedJob;
    }
  }

  protected _find(jobId: string): IJobWithRef | void {
    return this._JOBS.find((job) => job.jobId === jobId);
  }

  protected _schedule(job: IJob) {
    if (this._jobProvider) {
      const jobRef = this._jobProvider.schedule(job.cronSyntax, job.task);
      const jobWithRef = Object.assign({}, job, { jobRef: jobRef });
      this._JOBS.push(jobWithRef);
    } else {
      throw new Error('job provider not set');
    }
  }

  add(job: IJob): void {
    this._destroy(job.jobId);
    this._schedule(job);
  }

  remove(jobId: string): void {
    this._destroy(jobId);
  }

  destroyAll() {
    for (let job of this._JOBS) {
      job.jobRef.destroy();
    }
  }
}

export default new Jobs();
