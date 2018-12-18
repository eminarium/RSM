require 'test_helper'

class EquipmentTypesControllerTest < ActionController::TestCase
  setup do
    @equipment_type = equipment_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:equipment_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create equipment_type" do
    assert_difference('EquipmentType.count') do
      post :create, equipment_type: { equipmentTypeDesc: @equipment_type.equipmentTypeDesc, equipmentTypeName: @equipment_type.equipmentTypeName }
    end

    assert_redirected_to equipment_type_path(assigns(:equipment_type))
  end

  test "should show equipment_type" do
    get :show, id: @equipment_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @equipment_type
    assert_response :success
  end

  test "should update equipment_type" do
    patch :update, id: @equipment_type, equipment_type: { equipmentTypeDesc: @equipment_type.equipmentTypeDesc, equipmentTypeName: @equipment_type.equipmentTypeName }
    assert_redirected_to equipment_type_path(assigns(:equipment_type))
  end

  test "should destroy equipment_type" do
    assert_difference('EquipmentType.count', -1) do
      delete :destroy, id: @equipment_type
    end

    assert_redirected_to equipment_types_path
  end
end
