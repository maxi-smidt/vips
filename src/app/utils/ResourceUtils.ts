/* eslint-disable */
export class ResourceUtils {
  getValuesAtResourcePath(resource: any, elementPath: string): any[] {
    const pathSections = elementPath.split('.');
    if (resource && (resource.resourceType !== pathSections[0])) return [];
    let resourcePathValue;
    for (let index = 1; index < pathSections.length; index++) {
      const subPaths = pathSections[index];
      resourcePathValue = resourcePathValue
        ? resourcePathValue[subPaths]
        : resource[subPaths];
      if (resourcePathValue) {
        if (this.isPrimitive(resourcePathValue) || pathSections.length === 2) {
          return Array.isArray(resourcePathValue)
            ? [...resourcePathValue]
            : [resourcePathValue];
        } else if (
          Array.isArray(resourcePathValue) &&
          resourcePathValue.length > 0
        ) {
          const resultSet = [];
          for (
            let subPathIndex = 0;
            subPathIndex < resourcePathValue.length;
            subPathIndex++
          ) {
            const subPathValue = resourcePathValue[subPathIndex];
            if (this.isPrimitive(subPathValue)) {
              resultSet.push(subPathValue);
            } else {
              resultSet.push(
                ...this.getValuesAtResourcePath(
                  subPathValue,
                  pathSections.slice(index).join('.'),
                ),
              );
            }
          }
          return resultSet;
        } else if (typeof resourcePathValue === 'object') {
          return this.getValuesAtResourcePath(
            resourcePathValue,
            pathSections.slice(index).join('.'),
          );
        }
      } else {
        break;
      }
    }
    return [];
  }

  private isPrimitive(value: any) {
    return typeof value === 'boolean' || typeof value === 'string';
  }
}
/* eslint-enable */
