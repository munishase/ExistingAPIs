import Queue from 'bull';
import Bull from 'bull';

export class QueueService {

    // START: FLUID AWS Direct Connect creation
    public fluidDXActivePortValidate = new Queue('fluidDXActivePortValidate');
    public fluidDXActivePortCreate = new Queue('fluidDXActivePortCreate');
    public fluidDXAWSConfirm = new Queue('fluidDXAWSConfirm');
    public fluidDXAWSInterfaceCreate = new Queue('fluidDXAWSInterfaceCreate');
    public fluidDXXCloudEBGP = new Queue('fluidDXXCloudEBGP');
    // END: FLUID AWS Direct Connect creation

    public async clearRedis(queue: Bull.Queue) {
        await queue.empty();
        await queue.clean(0, 'active');
        await queue.clean(0, 'completed');
        await queue.clean(0, 'delayed');
        await queue.clean(0, 'failed');
    }
}