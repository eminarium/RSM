require 'test_helper'

class ModObjectsRolesControllerTest < ActionController::TestCase
  setup do
    @mod_objects_role = mod_objects_roles(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:mod_objects_roles)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create mod_objects_role" do
    assert_difference('ModObjectsRole.count') do
      post :create, mod_objects_role: { canCreate: @mod_objects_role.canCreate, canDelete: @mod_objects_role.canDelete, canRead: @mod_objects_role.canRead, canUpdate: @mod_objects_role.canUpdate, mod_object_id: @mod_objects_role.mod_object_id, role_id: @mod_objects_role.role_id }
    end

    assert_redirected_to mod_objects_role_path(assigns(:mod_objects_role))
  end

  test "should show mod_objects_role" do
    get :show, id: @mod_objects_role
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @mod_objects_role
    assert_response :success
  end

  test "should update mod_objects_role" do
    patch :update, id: @mod_objects_role, mod_objects_role: { canCreate: @mod_objects_role.canCreate, canDelete: @mod_objects_role.canDelete, canRead: @mod_objects_role.canRead, canUpdate: @mod_objects_role.canUpdate, mod_object_id: @mod_objects_role.mod_object_id, role_id: @mod_objects_role.role_id }
    assert_redirected_to mod_objects_role_path(assigns(:mod_objects_role))
  end

  test "should destroy mod_objects_role" do
    assert_difference('ModObjectsRole.count', -1) do
      delete :destroy, id: @mod_objects_role
    end

    assert_redirected_to mod_objects_roles_path
  end
end
