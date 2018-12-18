class RolesController < ApplicationController
  before_action :set_role, only: [:show, :edit, :update, :destroy]

  # GET /roles
  # GET /roles.json
  def index
    @roles = Role.all
  end

  # GET /roles/1
  # GET /roles/1.json
  def show
  end

  # GET /roles/new
  def new
    @role = Role.new
  end

  # GET /roles/1/edit
  def edit
    @mod_objects = ModObject.all
  end

  # POST /roles
  # POST /roles.json
  def create
    @role = Role.new(role_params)

    respond_to do |format|
      if @role.save
        format.html { redirect_to @role, notice: 'Role was successfully created.' }
        format.json { render :show, status: :created, location: @role }
      else
        format.html { render :new }
        format.json { render json: @role.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /roles/1
  # PATCH/PUT /roles/1.json
  def update
    respond_to do |format|
      if @role.update(role_params)
        #format.html { redirect_to @role, notice: 'Role was successfully updated.' }
        #@role.mod_objects_roles.where("role_id = ? and mod_object_id = ?", @role.id, 34)[0].canRead = 'FALSE'
        @role.change_role_permissions(params[:MObj])
        #format.html { redirect_to @role, notice: @role.mod_objects_roles.where("mod_object_id = ?", 34)[0].canUpdate}
        #format.html { redirect_to @role, notice: @role.mod_objects_roles.find_by_mod_object_id(34).inspect+" - "+@role.mod_objects_roles.find_by_mod_object_id(34).canUpdate.to_s}
        #format.html { redirect_to @role, notice: params[:MObj].inspect}
        format.html { redirect_to @role, notice: params[:MObj].map { |k,v| [k, v] } }
        format.json { render :show, status: :ok, location: @role }
      else
        format.html { render :edit }
        format.json { render json: @role.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /roles/1
  # DELETE /roles/1.json
  def destroy
    @role.destroy
    respond_to do |format|
      format.html { redirect_to roles_url, notice: 'Role was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_role
      @role = Role.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def role_params
      params.require(:role).permit(:name, :authorizable_type, :authorizable_id)
    end

end
