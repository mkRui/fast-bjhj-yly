/**
 * 具体的API服务实现
 * 使用BaseApiService创建各种业务API服务
 */

import { BaseApiService } from './service-manager';
import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';

// ==================== 系统管理API ====================

/**
 * 用户管理API服务
 */
export class UserApiService extends BaseApiService {
  /**
   * 获取用户列表
   */
  public async getUserList(params: PaginationParams & {
    keyword?: string;
    status?: number;
    roleId?: string;
  }): Promise<ApiResponse<PaginatedResponse<any>>> {
    return this.getPagedList('/system/users', params);
  }

  /**
   * 获取用户详情
   */
  public async getUserDetail(id: string | number): Promise<ApiResponse<any>> {
    return this.getDetail('/system/users', id);
  }

  /**
   * 创建用户
   */
  public async createUser(data: {
    username: string;
    password: string;
    email: string;
    phone: string;
    roleIds: string[];
  }): Promise<ApiResponse<any>> {
    return this.create('/system/users', data);
  }

  /**
   * 更新用户
   */
  public async updateUser(id: string | number, data: Record<string, any>): Promise<ApiResponse<any>> {
    return this.update('/system/users', id, data);
  }

  /**
   * 删除用户
   */
  public async deleteUser(id: string | number): Promise<ApiResponse<void>> {
    return this.remove('/system/users', id);
  }

  /**
   * 重置用户密码
   */
  public async resetPassword(id: string | number, newPassword: string): Promise<ApiResponse<void>> {
    return this.post(`/system/users/${id}/reset-password`, { password: newPassword });
  }

  /**
   * 启用/禁用用户
   */
  public async toggleUserStatus(id: string | number, status: number): Promise<ApiResponse<void>> {
    return this.patch(`/system/users/${id}/status`, { status });
  }
}

/**
 * 角色管理API服务
 */
export class RoleApiService extends BaseApiService {
  /**
   * 获取角色列表
   */
  public async getRoleList(params?: PaginationParams & {
    keyword?: string;
    status?: number;
  }): Promise<ApiResponse<PaginatedResponse<any>>> {
    return this.getPagedList('/system/roles', params);
  }

  /**
   * 获取所有角色（不分页）
   */
  public async getAllRoles(): Promise<ApiResponse<any[]>> {
    return this.get('/system/roles/all');
  }

  /**
   * 创建角色
   */
  public async createRole(data: {
    name: string;
    code: string;
    description: string;
    permissionIds: string[];
  }): Promise<ApiResponse<any>> {
    return this.create('/system/roles', data);
  }

  /**
   * 更新角色
   */
  public async updateRole(id: string | number, data: Record<string, any>): Promise<ApiResponse<any>> {
    return this.update('/system/roles', id, data);
  }

  /**
   * 删除角色
   */
  public async deleteRole(id: string | number): Promise<ApiResponse<void>> {
    return this.remove('/system/roles', id);
  }

  /**
   * 获取角色权限
   */
  public async getRolePermissions(id: string | number): Promise<ApiResponse<string[]>> {
    return this.get(`/system/roles/${id}/permissions`);
  }

  /**
   * 设置角色权限
   */
  public async setRolePermissions(id: string | number, permissionIds: string[]): Promise<ApiResponse<void>> {
    return this.post(`/system/roles/${id}/permissions`, { permissionIds });
  }
}

/**
 * 权限管理API服务
 */
export class PermissionApiService extends BaseApiService {
  /**
   * 获取权限树
   */
  public async getPermissionTree(): Promise<ApiResponse<any[]>> {
    return this.get('/system/permissions/tree');
  }

  /**
   * 获取权限列表
   */
  public async getPermissionList(params?: {
    type?: string;
    status?: number;
  }): Promise<ApiResponse<any[]>> {
    return this.get('/system/permissions', params);
  }

  /**
   * 创建权限
   */
  public async createPermission(data: {
    name: string;
    code: string;
    type: string;
    parentId?: string;
    path?: string;
    icon?: string;
    sort: number;
  }): Promise<ApiResponse<any>> {
    return this.create('/system/permissions', data);
  }

  /**
   * 更新权限
   */
  public async updatePermission(id: string | number, data: Record<string, any>): Promise<ApiResponse<any>> {
    return this.update('/system/permissions', id, data);
  }

  /**
   * 删除权限
   */
  public async deletePermission(id: string | number): Promise<ApiResponse<void>> {
    return this.remove('/system/permissions', id);
  }
}

// ==================== 内容管理API ====================

/**
 * 模版管理API服务
 */
export class TemplateApiService extends BaseApiService {
  /**
   * 获取模板列表
   */
  public async getTemplateList(params: PaginationParams & {
    keyword?: string;
    type?: string;
    status?: number;
  }): Promise<ApiResponse<PaginatedResponse<any>>> {
    return this.getPagedList('/cms/templates', params);
  }

  /**
   * 获取模板详情
   */
  public async getTemplateDetail(id: string | number): Promise<ApiResponse<any>> {
    return this.getDetail('/cms/templates', id);
  }

  /**
   * 创建模板
   */
  public async createTemplate(data: {
    name: string;
    type: string;
    content: string;
    description?: string;
  }): Promise<ApiResponse<any>> {
    return this.create('/cms/templates', data);
  }

  /**
   * 更新模板
   */
  public async updateTemplate(id: string | number, data: Record<string, any>): Promise<ApiResponse<any>> {
    return this.update('/cms/templates', id, data);
  }

  /**
   * 删除模板
   */
  public async deleteTemplate(id: string | number): Promise<ApiResponse<void>> {
    return this.remove('/cms/templates', id);
  }

  /**
   * 复制模板
   */
  public async copyTemplate(id: string | number, name: string): Promise<ApiResponse<any>> {
    return this.post(`/cms/templates/${id}/copy`, { name });
  }
}

// ==================== 运营管理API ====================

/**
 * 频道管理API服务
 */
export class ChannelApiService extends BaseApiService {
  /**
   * 获取频道列表
   */
  public async getChannelList(params?: PaginationParams & {
    keyword?: string;
    status?: number;
  }): Promise<ApiResponse<PaginatedResponse<any>>> {
    return this.getPagedList('/operation/channels', params);
  }

  /**
   * 获取频道树
   */
  public async getChannelTree(): Promise<ApiResponse<any[]>> {
    return this.get('/operation/channels/tree');
  }

  /**
   * 创建频道
   */
  public async createChannel(data: {
    name: string;
    code: string;
    parentId?: string;
    sort: number;
    description?: string;
  }): Promise<ApiResponse<any>> {
    return this.create('/operation/channels', data);
  }

  /**
   * 更新频道
   */
  public async updateChannel(id: string | number, data: Record<string, any>): Promise<ApiResponse<any>> {
    return this.update('/operation/channels', id, data);
  }

  /**
   * 删除频道
   */
  public async deleteChannel(id: string | number): Promise<ApiResponse<void>> {
    return this.remove('/operation/channels', id);
  }
}

/**
 * 页面管理API服务
 */
export class PageApiService extends BaseApiService {
  /**
   * 获取页面列表
   */
  public async getPageList(params: PaginationParams & {
    keyword?: string;
    channelId?: string;
    status?: number;
  }): Promise<ApiResponse<PaginatedResponse<any>>> {
    return this.getPagedList('/operation/pages', params);
  }

  /**
   * 获取页面详情
   */
  public async getPageDetail(id: string | number): Promise<ApiResponse<any>> {
    return this.getDetail('/operation/pages', id);
  }

  /**
   * 创建页面
   */
  public async createPage(data: {
    title: string;
    content: string;
    channelId: string;
    templateId?: string;
    status: number;
  }): Promise<ApiResponse<any>> {
    return this.create('/operation/pages', data);
  }

  /**
   * 更新页面
   */
  public async updatePage(id: string | number, data: Record<string, any>): Promise<ApiResponse<any>> {
    return this.update('/operation/pages', id, data);
  }

  /**
   * 删除页面
   */
  public async deletePage(id: string | number): Promise<ApiResponse<void>> {
    return this.remove('/operation/pages', id);
  }

  /**
   * 发布页面
   */
  public async publishPage(id: string | number): Promise<ApiResponse<void>> {
    return this.post(`/operation/pages/${id}/publish`);
  }

  /**
   * 下线页面
   */
  public async unpublishPage(id: string | number): Promise<ApiResponse<void>> {
    return this.post(`/operation/pages/${id}/unpublish`);
  }
}

// ==================== 业务管理API ====================

/**
 * 意向管理API服务
 */
export class IntentionApiService extends BaseApiService {
  /**
   * 获取意向列表
   */
  public async getIntentionList(params: PaginationParams & {
    keyword?: string;
    area?: number;
    mode?: number;
    repliedFlag?: boolean;
  }): Promise<ApiResponse<PaginatedResponse<any>>> {
    return this.getPagedList('/business/intentions', params);
  }

  /**
   * 回复意向
   */
  public async replyIntention(id: string | number, data: {
    replyContent: string;
    replyTime?: string;
  }): Promise<ApiResponse<void>> {
    return this.post(`/business/intentions/${id}/reply`, data);
  }

  /**
   * 标记为已回复
   */
  public async markAsReplied(id: string | number): Promise<ApiResponse<void>> {
    return this.patch(`/business/intentions/${id}/replied`, { repliedFlag: true });
  }

  /**
   * 批量标记为已回复
   */
  public async batchMarkAsReplied(ids: (string | number)[]): Promise<ApiResponse<void>> {
    return this.post('/business/intentions/batch-replied', { ids });
  }

  /**
   * 导出意向数据
   */
  public async exportIntentions(): Promise<void> {
    return this.download('/business/intentions/export', 'intentions.xlsx');
  }
}

// ==================== 文件管理API ====================

/**
 * 文件管理API服务
 */
export class FileApiService extends BaseApiService {
  /**
   * 上传单个文件
   */
  public async uploadFile(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<ApiResponse<any>> {
    return this.upload('/common/upload', file, onProgress);
  }

  /**
   * 上传多个文件
   */
  public async uploadFiles(
    files: File[],
    onProgress?: (percent: number) => void
  ): Promise<ApiResponse<any[]>> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    return this.post('/common/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    });
  }

  /**
   * 删除文件
   */
  public async deleteFile(fileUrl: string): Promise<ApiResponse<void>> {
    return this.post('/common/file/delete', { url: fileUrl });
  }

  /**
   * 获取文件信息
   */
  public async getFileInfo(fileUrl: string): Promise<ApiResponse<any>> {
    return this.get('/common/file/info', { url: fileUrl });
  }
}
