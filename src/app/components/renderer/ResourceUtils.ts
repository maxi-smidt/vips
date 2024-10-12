// TODO delete as soon as https://github.com/smilecdr/FHIR.ts/pull/92 is merged
// this is a temporary solution as long as the bug is not fixed
/* eslint-disable */
export class ResourceUtils {
  getValuesAtResourcePath(resource: any, elementPath: string): any[] {
    const pathSections = elementPath.split('.');
    let resourcePathValue;
    for (let index = 1; index < pathSections.length; index++) {
      const subPaths = pathSections[index];
      resourcePathValue = resourcePathValue
        ? resourcePathValue[subPaths]
        : resource[subPaths];
      if (resourcePathValue) {
        if (this.isPrimitive(resourcePathValue)) {
          return [resourcePathValue];
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
            } else if (pathSections.length == 2) {
              return [...resourcePathValue];
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
