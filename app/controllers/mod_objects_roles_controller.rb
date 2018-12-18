class ModObjectsRolesController < ApplicationController
  before_action :set_mod_objects_role, only: [:show, :edit, :update, :destroy]

  # GET /mod_objects_roles
  # GET /mod_objects_roles.json
  def index
    @mod_objects_roles = ModObjectsRole.all
  end

  # GET /mod_objects_roles/1
  # GET /mod_objects_roles/1.json
  def show
  end

  # GET /mod_objects_roles/new
  def new
    @mod_objects_role = ModObjectsRole.new
  end

  # GET /mod_objects_roles/1/edit
  def edit
  end

  # POST /mod_objects_roles
  # POST /mod_objects_roles.json
  def create
    @mod_objects_role = ModObjectsRole.new(mod_objects_role_params)

    respond_to do |format|
      if @mod_objects_role.save
        format.html { redirect_to @mod_objects_role, notice: 'Mod objects role was successfully created.' }
        format.json { render :show, status: :created, location: @mod_objects_role }
      else
        format.html { render :new }
        format.json { render json: @mod_objects_role.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /mod_objects_roles/1
  # PATCH/PUT /mod_objects_roles/1.json
  def update
    respond_to do |format|
      if @mod_objects_role.update(mod_objects_role_params)
        format.html { redirect_to @mod_objects_role, notice: 'Mod objects role was successfully updated.' }
        format.json { render :show, status: :ok, location: @mod_objects_role }
      else
        format.html { render :edit }
        format.json { render json: @mod_objects_role.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /mod_objects_roles/1
  # DELETE /mod_objects_roles/1.json
  def destroy
    @mod_objects_role.destroy
    respond_to do |format|
      format.html { redirect_to mod_objects_roles_url, notice: 'Mod objects role was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mod_objects_role
      @mod_objects_role = ModObjectsRole.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mod_objects_role_params
      params.require(:mod_objects_role).permit(:mod_object_id, :role_id, :canCreate, :canRead, :canUpdate, :canDelete)
    end
end
