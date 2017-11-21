type classnamesAcceptedTypes = string | boolean | null | undefined;

export const classnames = (...classes: classnamesAcceptedTypes[]) => {
    return classes.filter(c => !!c).join(' ');
};
