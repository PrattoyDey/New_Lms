class Authorization {
  private permissionMap: Record<string, boolean> = {};

  // Initialize permissions from backend login response
  initialize(permissions: string[]) {
    this.permissionMap = {};

    permissions.forEach((permission) => {
      this.permissionMap[permission] = true;
    });

    localStorage.setItem(
      "permissionMap",
      JSON.stringify(this.permissionMap)
    );
  }

  // Load permissions when app reloads
  loadFromStorage() {
    const stored = localStorage.getItem("permissionMap");
    this.permissionMap = stored ? JSON.parse(stored) : {};
  }

  // Check authorization
  isAuthorized(permission: string): boolean {
    return !!this.permissionMap[permission];
  }

  // Optional: clear permissions on logout
  clear() {
    this.permissionMap = {};
    localStorage.removeItem("permissionMap");
  }
}

// n instance
const authorization = new Authorization();

export default authorization;
