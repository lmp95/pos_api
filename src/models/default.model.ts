const defaultFields = {
    createdBy: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    updatedBy: {
        type: String,
        required: true,
    },
    updatedDate: {
        type: Date,
        default: Date.now(),
    },
};

export default defaultFields;
