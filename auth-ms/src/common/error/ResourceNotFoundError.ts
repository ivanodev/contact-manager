import NotFoundError from '@common/error/NotFoundError';

class ResourceNotFoundError extends NotFoundError {

    constructor(readonly message: string) {
        super(message);
    }
}

export default ResourceNotFoundError;